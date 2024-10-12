
import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  otp: number;
}

const otpSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
});

export default mongoose.model<IOtp>('Otp', otpSchema);