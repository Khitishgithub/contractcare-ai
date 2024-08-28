// models/Invoice.js
import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  invoicesno: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);

export default Invoice;
