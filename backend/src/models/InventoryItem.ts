import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryItem extends Document {
  name: string;
  stock: number;
  price: number;
  gstRate: number;
  category: string;
  storeId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InventoryItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    gstRate: { type: Number, default: 18 },
    category: { type: String, required: true },
    storeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);
