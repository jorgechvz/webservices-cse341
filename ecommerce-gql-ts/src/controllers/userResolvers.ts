import User, { IUser } from '../models/users';
import { ObjectId } from 'mongodb';

const userResolvers = {
  Query: {
    allUsers: async (): Promise<IUser[]> => {
      try {
        const users: IUser[] = await User.find();
        return users;
      } catch (err) {
        throw err;
      }
    },
    simpleUser: async (_: any, { _id }: { _id: string }): Promise<IUser[]> => {
      try {
        const userId = new ObjectId(_id);
        const user: IUser[] | null = await User.find({ _id: userId });
        return user;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createUser: async (
      parent: any,
      args: {
        input: {
          name: string;
          email: string;
          password: string;
          phone: string;
        };
      },
      context: any,
      info: any
    ): Promise<IUser> => {
      try {
        const user: IUser = new User({ ...args.input });
        const savedUser: IUser = await user.save();
        return savedUser;
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (
      _: any,
      {
        _id,
        input: { name, email, password, phone }
      }: {
        _id: string;
        input: {
          name?: string;
          email?: string;
          password?: string;
          phone?: string;
        };
      }
    ): Promise<IUser> => {
      try {
        const userId = new ObjectId(_id);
        const filterId = { _id: userId };
        const update = {
          $set: {
            name,
            email,
            password,
            phone
          }
        };
        const options = { returnOriginal: false };
        const updatedUser = await User.findOneAndUpdate(filterId, update, options);
        if (!updatedUser) {
          throw new Error('User not found!');
        }
        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
    deleteUser: async (_: any, { _id }: { _id: string }): Promise<string> => {
      try {
        const userId = new ObjectId(_id);
        const user: IUser | null = await User.findByIdAndDelete({ _id: userId });
        if (!user) {
          throw new Error('User not found');
        }
        return 'Product deleted succesfully';
      } catch (err) {
        throw err;
      }
    }
  }
};

export default userResolvers;
