import Products, { IProduct } from '../models/products';
import { ObjectId } from 'mongodb';

const productsResolver = {
  Query: {
    allProducts: async (): Promise<IProduct[]> => {
      try {
        const products: IProduct[] = await Products.find();
        return products;
      } catch (err) {
        throw err;
      }
    },
    singleProduct: async (_: any, { _id }: { _id: string }): Promise<IProduct[]> => {
      try {
        const productId = new ObjectId(_id);
        const product: IProduct[] | null = await Products.find({ _id: productId });
        return product;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createProduct: async (
      parent: any,
      args: {
        name: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
        quantity: number;
      },
      context: any,
      info: any
    ): Promise<IProduct> => {
      try {
        const { name, description, price, image_url, category, quantity } = args;
        const product: IProduct = new Products({
          name,
          description,
          price,
          image_url,
          category,
          quantity
        });
        await product.save();
        return product;
      } catch (err) {
        throw err;
      }
    },
    updateProduct: async (
      _: any,
      {
        _id,
        name,
        description,
        price,
        image_url,
        category,
        quantity
      }: {
        _id: string;
        name: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
        quantity: number;
      }
    ): Promise<IProduct> => {
      try {
        const productId = new ObjectId(_id);
        const product: IProduct | null = await Products.findOne({ _id: productId });
        if (!product) {
          throw new Error('Product not found!');
        }
        if (name) {
          product.name = name;
        }
        if (description) {
          product.description = description;
        }
        if (price) {
          product.price = price;
        }
        if (image_url) {
          product.image_url = image_url;
        }
        if (category) {
          product.category = category;
        }
        if (quantity) {
          product.quantity = quantity;
        }
        product.save();
        return product;
      } catch (err) {
        throw err;
      }
    },
    deleteProduct: async (_: any, { _id }: { _id: string }): Promise<string> => {
      try {
        const productId = new ObjectId(_id);
        const product: IProduct | null = await Products.findByIdAndDelete({ _id: productId });
        if (!product) {
          throw new Error('Product not found!');
        }
        return 'Product deleted successfully';
      } catch (err) {
        throw err;
      }
    }
  }
};

export default productsResolver;
