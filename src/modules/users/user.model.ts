import { Schema, Types, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: 'user' | 'admin';
}
export type IUserDocument = IUser  & { _id: Types.ObjectId };

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    photo: {
      type: String,
      default: 'default-avatar.png',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', userSchema);
export default User;