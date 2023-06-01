import User, { IUser } from '../../models/usersModel';
import { ObjectId } from 'mongodb';
import { usersCreateValidationSchema, updateUsersSchema } from '../../utils/usersValidation';
import bcrypt from 'bcrypt';
import { AuthenticationError } from 'apollo-server';

enum UserRole {
  Doctor = 'doctor',
  Patient = 'patient'
}

const usersResolver = {
  Query: {
    getAllUsers: async (__:any, _:any, context: any): Promise<IUser[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const users: IUser[] = await User.find();
        if (!users) {
          throw new Error('User not found!');
        }
        return users;
      } catch (err) {
        throw err;
      }
    },
    getFindUserById: async (_: any, { _id }: { _id: string }, context:any): Promise<IUser[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const userId = new ObjectId(_id);
        const userFindById: IUser[] | null = await User.find({ _id: userId });
        if (userFindById.length === 0) {
          throw new Error('User not found!');
        }
        return userFindById;
      } catch (err) {
        throw err;
      }
    },
    getFindUserByRole: async (_: any, { userRole }: { userRole: UserRole }, context:any): Promise<IUser[]> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const userFindByRole: IUser[] | null = await User.find({ userRole: userRole });
        if (userFindByRole.length === 0) {
          throw new Error('User Role not found!');
        }
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
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const { userPassword } = args.user;
        const validateCreateUser = usersCreateValidationSchema.validate({ ...args.user });
        if (validateCreateUser.error) {
          throw new Error(validateCreateUser.error.details[0].message);
        }
        const passwordHashed = await bcrypt.hash(userPassword, 10);
        const newUser: IUser = new User({ ...args.user, userPassword: passwordHashed });
        await newUser.save();
        return newUser;
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (
      parent: any,
      args: {
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
      },
      context:any
    ): Promise<IUser> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
      try {
        const { userPassword } = args.user;
        const validateUpdate = updateUsersSchema.validate({ ...args.user });
        if (validateUpdate.error) {
          throw new Error(validateUpdate.error.details[0].message);
        }
        const passwordHashed = await bcrypt.hash(userPassword, 10);
        const userId = new ObjectId(args._id);
        const filterUser = { _id: userId };
        const update = {
          $set: { ...args.user, userPassword: passwordHashed }
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
    deleteUser: async (_: any, { _id }: { _id: string }, context:any): Promise<string> => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError('To be able to access this data. You need to authenticate.');
      }
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
