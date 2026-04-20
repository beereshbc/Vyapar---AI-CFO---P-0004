import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phone: string;
  currentBalance: number;
  creditScore: number;
  isSuspicious: boolean;
  hasAutoPay: boolean;
  storeId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    currentBalance: { type: Number, default: 0 },
    creditScore: { type: Number, default: 50 },
    isSuspicious: { type: Boolean, default: false },
    hasAutoPay: { type: Boolean, default: false },
    storeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
