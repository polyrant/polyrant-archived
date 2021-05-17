import { model, Schema, Model, Document } from 'mongoose';

const reqString = { type: String, required: true };

interface IUser extends Document {
  username: string;
  password: string;
  createdAt: string;
  updatedAt?: string;
  name?: string;
  bio?: string;
}

const UserSchema: Schema = new Schema({
  username: reqString,
  password: reqString,
  createdAt: reqString,
  updatedAt: String,
  name: String,
  bio: String,
});

export const User: Model<IUser> = model('User', UserSchema);
