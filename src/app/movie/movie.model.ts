import { model, Schema } from 'mongoose';
import { TMovie, TReview } from './movie.interface';

const reviewSchema = new Schema<TReview>({
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

// Create the movie Schema
const movieSchema = new Schema<TMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  reviews: { type: [reviewSchema], default: [] },
  viewCount: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
});

// Create the Models
export const Movie = model<TMovie>('Movie', movieSchema);
