import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoiceItem {
  id: string; // from frontend
  name: string;
  price: number;
  qty: number;
  gst: number;
}

export interface IInvoice extends Document {
  storeId: mongoose.Types.ObjectId;
  items: IInvoiceItem[];
  subtotal: number;
  gstAmount: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceItemSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  gst: { type: Number, required: true }
});

const InvoiceSchema: Schema = new Schema(
  {
    storeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [InvoiceItemSchema],
    subtotal: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
