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
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
