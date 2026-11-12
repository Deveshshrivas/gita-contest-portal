import * as bookService from '../services/book.service.js';
import { sendSuccess } from '../utils/response.js';

export async function listBooks(req, res, next) {
  try {
    const { language, search } = req.query;
    const books = await bookService.getBooks({ language, search });
    return sendSuccess(res, books, 'Bhagavad Gita books catalog');
  } catch (err) {
    next(err);
  }
}

export async function createBook(req, res, next) {
  try {
    const newBook = await bookService.createBook(req.body, req);
    return sendSuccess(res, newBook, 'Book edition added to inventory', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateStock(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await bookService.updateStock(id, req.body, req);
    return sendSuccess(res, updated, 'Inventory stock updated successfully');
  } catch (err) {
    next(err);
  }
}

export async function listConsignments(req, res, next) {
  try {
    const { search, status } = req.query;
    const list = await bookService.getConsignments({ search, status });
    return sendSuccess(res, list, 'Distribution consignments');
  } catch (err) {
    next(err);
  }
}

export async function createConsignment(req, res, next) {
  try {
    const consignment = await bookService.createConsignment(req.body, req);
    return sendSuccess(res, consignment, 'Dispatch consignment created successfully', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateConsignment(req, res, next) {
  try {
    const { trackingNumber } = req.params;
    const { status, receivedBy } = req.body;
    const updated = await bookService.updateConsignmentStatus(trackingNumber, status, receivedBy, req);
    return sendSuccess(res, updated, 'Consignment status updated successfully');
  } catch (err) {
    next(err);
  }
}
