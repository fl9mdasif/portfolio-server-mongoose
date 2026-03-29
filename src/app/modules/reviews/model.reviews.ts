import { Schema, model } from 'mongoose';
import { TReview } from './interface.reviews';

const reviewSchema = new Schema<TReview>({
  userName: { type: String, required: true },
  userTitle: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export const Review = model<TReview>('Review', reviewSchema);
