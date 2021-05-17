import { model, Schema, Model, Document } from 'mongoose';

const reqString = { type: String, required: true };

interface IPost extends Document {
  content: string;
  createdAt: string;
}

const PostSchema: Schema = new Schema({
  content: reqString,
  createdAt: reqString,
});

export const Post: Model<IPost> = model('User', PostSchema);
