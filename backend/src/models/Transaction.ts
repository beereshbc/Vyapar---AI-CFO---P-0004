import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  customerId: mongoose.Types.ObjectId;
  amount: number;
  type: 'Credit' | 'Debit';
  description: string;
  timestamp: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Credit', 'Debit'], required: true },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
