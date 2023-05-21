import User, { IUser } from '../../models/usersModel';
import { ObjectId } from 'mongodb';

const usersResolver = {
  Query: {
    getAllUsers: async (): Promise<IUser[]> => {
      try {
        const users: IUser[] = await User.find();
        return users;
      } catch (err) {
        throw err;
      }
    }
  }
};

export default usersResolver;
