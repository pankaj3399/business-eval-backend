import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  generateAuthToken: () => string;
  validatePassword: (password: string) => boolean;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = function (): string {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

export default mongoose.model<IUser>('User', userSchema);
