
import { model, Schema, Types } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  description: string;
  coverImage: string;
 genre: Types.ObjectId; 
  totalPages: number;
}


const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
  totalPages: { type: Number, default: 0 },
}, { timestamps: true });

export default model<IBook>('Book', bookSchema);