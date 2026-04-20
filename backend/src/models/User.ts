import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  password: string;
  ownerName: string;
  storeName: string;
  countryCode: string;
  businessType: string;
  storeAddress?: string;
  gstin?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ownerName: { type: String, required: true },
    storeName: { type: String, required: true },
    countryCode: { type: String, default: '+91' },
    businessType: { type: String, required: true },
    storeAddress: { type: String },
    gstin: { type: String },
    aiTone: { type: String, default: 'Negotiator' },
    autoRemindMinBalance: { type: Number, default: 500 },
    autoRemindOverdueDays: { type: Number, default: 15 },
    opHoursStart: { type: String, default: '09:00' },
    opHoursEnd: { type: String, default: '20:00' },
    upiId: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    ifscCode: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
