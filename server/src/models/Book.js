import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    hindiTitle: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'A.C. Bhaktivedanta Swami Prabhupāda',
    },
    language: {
      type: String,
      required: true,
      index: true,
    },
    isbn: {
      type: String,
      default: '',
    },
    pages: {
      type: Number,
      default: 800,
    },
    edition: {
      type: String,
      default: 'Standard Hardbound Edition',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sponsorCost: {
      type: Number,
      required: true,
      min: 0,
    },
    coverImage: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    stockReceived: {
      type: Number,
      default: 0,
      min: [0, 'Stock received cannot be negative'],
    },
    stockAllocated: {
      type: Number,
      default: 0,
      min: [0, 'Stock allocated cannot be negative'],
    },
    stockDistributed: {
      type: Number,
      default: 0,
      min: [0, 'Stock distributed cannot be negative'],
    },
    stockAvailable: {
      type: Number,
      default: 0,
      min: [0, 'Available stock cannot be negative (Negative Stock Guard)'],
    },
    distributionLocations: [{ type: String }],
    isAvailableForSponsorship: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Enforce available = received - (allocated + distributed) and prevent negative
bookSchema.pre('validate', function (next) {
  const received = this.stockReceived || 0;
  const allocated = this.stockAllocated || 0;
  const distributed = this.stockDistributed || 0;

  const available = received - (allocated + distributed);
  if (available < 0) {
    return next(
      new Error(`Negative Stock Guard: Available stock cannot drop below 0! Deficit: ${Math.abs(available)} units.`)
    );
  }

  this.stockAvailable = available;
  next();
});

export const Book = mongoose.model('Book', bookSchema);
