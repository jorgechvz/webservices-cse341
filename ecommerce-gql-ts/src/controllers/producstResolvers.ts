
import { ObjectId } from 'mongodb';
import { IProduct } from '../models/products';
import { Products } from '../models';


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
        input: {
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          quantity: number;
        }
      },
      context: any,
      info: any
    ): Promise<IProduct> => {
      try {
        const product: IProduct = new Products({...args.input});
        await product.save()
        return product;
      } catch (err) {
        throw err;
      }
    },
    updateProduct: async (
      _: any,
      {
        _id,
        input: {
          name,
          description,
          price,
          image_url,
          category,
          quantity
        }
      }: {
        _id: string;
        input: {
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          quantity: number;
        }
      }
    ): Promise<IProduct> => {
      try {
        const productId = new ObjectId(_id);
        const filter = { _id: productId };
        const update = {
          $set: {
            name,
            description,
            price,
            image_url,
            category,
            quantity
          }
        };
        const options = { returnOriginal: false };
        const updatedProduct = await Products.findOneAndUpdate(filter, update, options);
        if (!updatedProduct) {
          throw new Error('Product not found!');
        }
        
        return updatedProduct;
        
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
