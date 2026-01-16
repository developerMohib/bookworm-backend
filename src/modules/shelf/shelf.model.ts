import { Types } from 'mongoose';
import { model, Schema } from 'mongoose';
export type ShelfStatus = 'want-to-read' | 'currently-reading' | 'read';

export interface IShelf {
  user: Types.ObjectId;
  book: Types.ObjectId;
  status: ShelfStatus;
  progress: number;
  finishedAt?: Date;
}

const shelfSchema = new Schema<IShelf>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    book: { type: Types.ObjectId, ref: 'Book', required: true },
    status: {
      type: String,
      enum: ['want-to-read', 'currently-reading', 'read'],
      required: true,
    },
    progress: { type: Number, default: 0 },
    finishedAt: { type: Date },
  },
  { timestamps: true },
);

shelfSchema.index({ user: 1, book: 1, status: 1 }, { unique: true });

export default model<IShelf>('Shelf', shelfSchema);