import mongoose, { Document, Model } from 'mongoose';

enum UserRole {
  Doctor = 'doctor',
  Patient = 'patient'
}

export interface IUser extends Document {
  userName: string;
  userEmail: string;
  userPassword: string;
  userBirthday: string;
  userAddress: string;
  userPhone: string;
  userRole: UserRole;
}

const userSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  userEmail: {
    type: String
  },
  userPassword: {
    type: String
  },
  userBirthday: {
    type: String
  },
  userAddress: {
    type: String
  },
  userPhone: {
    type: String
  },
  userRole: {
    type: String,
    enum: Object.values(UserRole)
  }
});

const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export default User;
