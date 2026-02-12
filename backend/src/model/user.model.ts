import { model, Schema } from "mongoose";

export interface UserModel {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isOnline: boolean;
}

const userSchema = new Schema<UserModel>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, required: true ,default: false},
});

export const UserModel = model<UserModel>('User', userSchema);
