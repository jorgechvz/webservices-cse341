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
        name: string;
        email: string;
        password: string;
        phone: string;
      },
      context: any,
      info: any
    ): Promise<IUser> => {
      try {
        const { name, email, password, phone } = args;
        const user: IUser = new User({
          name,
          email,
          password,
          phone
        });
        const savedUser: IUser = await user.save();
        console.log(savedUser);
        return savedUser;
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (
      _: any,
      {
        _id,
        name,
        email,
        password,
        phone
      }: { _id: string; name?: string; email?: string; password?: string; phone?: string }
    ): Promise<IUser> => {
      try {
        const userId = new ObjectId(_id);
        const user: IUser | null = await User.findOne({ _id: userId });
        if (!user) {
          throw new Error('User not found!');
        }
        if (name) {
          user.name = name;
        }
        if (email) {
          user.email = email;
        }
        if (password) {
          user.password = password;
        }
        if (phone) {
          user.phone = phone;
        }
        await user.save();
        return user;
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
