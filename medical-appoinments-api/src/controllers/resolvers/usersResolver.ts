import { string } from 'joi';
import User, { IUser } from '../../models/usersModel';
import { ObjectId } from 'mongodb';

enum UserRole {
  Doctor = 'doctor',
  Patient = 'patient'
}

const usersResolver = {
  Query: {
    getAllUsers: async (): Promise<IUser[]> => {
      try {
        const users: IUser[] = await User.find();
        return users;
      } catch (err) {
        throw err;
      }
    },
    getFindUserById: async (_: any, { _id }: { _id: string }): Promise<IUser[]> => {
      try {
        const userId = new ObjectId(_id);
        const userFindById: IUser[] | null = await User.find({ _id: userId });
        return userFindById;
      } catch (err) {
        throw err;
      }
    },
    getFindUserByRole: async (_: any, { userRole }: { userRole: UserRole }): Promise<IUser[]> => {
      try {
        const userFindByRole: IUser[] | null = await User.find({ userRole: userRole });
        return userFindByRole;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createNewUser: async (
      parent: any,
      args: {
        user: {
          userName: string;
          userEmail: string;
          userPassword: string;
          userBirthday: string;
          userAddress: string;
          userPhone: string;
          userRole: UserRole;
        };
      },
      context: any,
      info: any
    ): Promise<IUser> => {
      try {
        const newUser: IUser = new User({ ...args.user });
        await newUser.save();
        return newUser;
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (
      _: any,
      {
        _id,
        user: { userName, userEmail, userPassword, userBirthday, userAddress, userPhone, userRole }
      }: {
        _id: string;
        user: {
          userName: string;
          userEmail: string;
          userPassword: string;
          userBirthday: string;
          userAddress: string;
          userPhone: string;
          userRole: UserRole;
        };
      }
    ): Promise<IUser> => {
      try {
        const userId = new ObjectId(_id);
        const filterUser = { _id: userId };
        const update = {
          $set: {
            userName,
            userEmail,
            userPassword,
            userBirthday,
            userAddress,
            userPhone,
            userRole
          }
        };
        const options = { returnOriginal: false };
        const updatedUser = await User.findOneAndUpdate(filterUser, update, options);
        if (!updatedUser) {
          throw new Error('User not found!');
        }
        updatedUser.save();
        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
    deleteUser: async (_: any, { _id }: { _id: string }): Promise<string> => {
      try {
        const userId = new ObjectId(_id);
        const deletedUser: IUser | null = await User.findByIdAndDelete({ _id: userId });
        if (!deletedUser) {
          throw new Error('User not found!');
        }
        return `${deletedUser.userName} deleted successfully`;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default usersResolver;
