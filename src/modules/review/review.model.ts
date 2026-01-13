import { model, Schema } from 'mongoose';
import { Types } from 'mongoose';

export interface IReview {
  book: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  comment: string;
  approved: boolean;
}

export type IReviewDocument = IReview & { _id: Types.ObjectId };
const reviewSchema = new Schema<IReview>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

export default model<IReview>('Review', reviewSchema);
