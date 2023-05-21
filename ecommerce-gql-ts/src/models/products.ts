import mongoose, { Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category?: string;
  quantity?: number;
  created_at?: Date;
  updated_at?: Date;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  image_url: {
    type: String
  },
  category: {
    type: String
  },
  quantity: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Products: Model<IProduct> = mongoose.model<IProduct>('products', productSchema);

export default Products;
