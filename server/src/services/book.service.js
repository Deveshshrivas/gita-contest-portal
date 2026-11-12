import { Book } from '../models/Book.js';
import { DistributionConsignment } from '../models/DistributionConsignment.js';
import { logAuditAction } from '../middleware/audit.middleware.js';

export async function getBooks({ language, search }) {
  const query = {};
  if (language && language !== 'All') {
    query.language = language;
  }
  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: regex }, { hindiTitle: regex }, { isbn: regex }, { description: regex }];
  }

  return Book.find(query).sort({ stockAvailable: -1 });
}

export async function createBook(bookData, req) {
  const id = `b-${Date.now()}`;
  const stockReceived = Number(bookData.stockReceived || 0);
  const stockAllocated = Number(bookData.stockAllocated || 0);
  const stockDistributed = Number(bookData.stockDistributed || 0);

  const newBook = await Book.create({
    ...bookData,
    id,
    stockReceived,
    stockAllocated,
    stockDistributed,
  });

  await logAuditAction({
    action: 'BOOK_CREATE',
    req,
    targetResource: 'Book',
    targetId: newBook.id,
    details: { title: newBook.title, stockReceived },
  });

  return newBook;
}

export async function updateStock(bookId, { stockReceived, stockAllocated, stockDistributed }, req) {
  const book = await Book.findOne({ id: bookId });
  if (!book) {
    const error = new Error(`Book '${bookId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  const received = stockReceived !== undefined ? Number(stockReceived) : book.stockReceived;
  const allocated = stockAllocated !== undefined ? Number(stockAllocated) : book.stockAllocated;
  const distributed = stockDistributed !== undefined ? Number(stockDistributed) : book.stockDistributed;

  const available = received - (allocated + distributed);
  if (available < 0) {
    const error = new Error(
      `Negative Stock Protection: Available stock cannot drop below zero! Deficit: ${Math.abs(available)} units.`
    );
    error.statusCode = 400;
    throw error;
  }

  book.stockReceived = received;
  book.stockAllocated = allocated;
  book.stockDistributed = distributed;
  book.stockAvailable = available;

  await book.save();

  await logAuditAction({
    action: 'BOOK_STOCK_UPDATE',
    req,
    targetResource: 'Book',
    targetId: book.id,
    details: { title: book.title, stockAvailable: available },
  });

  return book;
}

export async function getConsignments({ search, status }) {
  const query = {};
  if (status && status !== 'all') {
    query.status = status;
  }
  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ trackingNumber: regex }, { destination: regex }, { bookTitle: regex }];
  }

  return DistributionConsignment.find(query).sort({ createdAt: -1 });
}

export async function createConsignment(consignmentData, req) {
  const book = await Book.findOne({ id: consignmentData.bookId });
  if (!book) {
    const error = new Error(`Book '${consignmentData.bookId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  const quantity = Number(consignmentData.quantity || 0);
  if (book.stockAvailable < quantity) {
    const error = new Error(
      `Negative Stock Protection: Insufficient available stock for '${book.title}'. Available: ${book.stockAvailable}, Requested: ${quantity}`
    );
    error.statusCode = 400;
    throw error;
  }

  // Deduct available stock and update distributed
  book.stockAllocated = Math.max(0, book.stockAllocated - quantity);
  book.stockDistributed = book.stockDistributed + quantity;
  book.stockAvailable = Math.max(0, book.stockReceived - (book.stockAllocated + book.stockDistributed));
  await book.save();

  const trackingNumber = `EXP-${Math.floor(100000 + Math.random() * 900000)}`;

  const consignment = await DistributionConsignment.create({
    ...consignmentData,
    trackingNumber,
    bookTitle: book.title,
    status: 'dispatched',
    dispatchDate: new Date().toISOString().split('T')[0],
  });

  await logAuditAction({
    action: 'CONSIGNMENT_CREATE',
    req,
    targetResource: 'DistributionConsignment',
    targetId: consignment.trackingNumber,
    details: { bookTitle: book.title, quantity, destination: consignment.destination },
  });

  return consignment;
}

export async function updateConsignmentStatus(trackingNumber, status, receivedBy = '', req = null) {
  const consignment = await DistributionConsignment.findOne({ trackingNumber });
  if (!consignment) {
    const error = new Error(`Consignment '${trackingNumber}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  consignment.status = status;
  if (receivedBy) consignment.receivedBy = receivedBy;
  if (status === 'delivered') consignment.deliveredAt = new Date();

  await consignment.save();

  if (req) {
    await logAuditAction({
      action: 'CONSIGNMENT_STATUS_UPDATE',
      req,
      targetResource: 'DistributionConsignment',
      targetId: trackingNumber,
      details: { status, receivedBy },
    });
  }

  return consignment;
}
