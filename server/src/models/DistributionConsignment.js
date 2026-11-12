import mongoose from 'mongoose';

const distributionConsignmentSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    campaignId: {
      type: String,
      default: '',
    },
    bookId: {
      type: String,
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    sourceHub: {
      type: String,
      default: 'Mayapur Central Warehouse',
    },
    destination: {
      type: String,
      required: true,
    },
    courierName: {
      type: String,
      required: true,
    },
    dispatchDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    estimatedDelivery: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'dispatched', 'in_transit', 'delivered', 'cancelled'],
      default: 'dispatched',
      index: true,
    },
    receivedBy: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const DistributionConsignment = mongoose.model(
  'DistributionConsignment',
  distributionConsignmentSchema
);
