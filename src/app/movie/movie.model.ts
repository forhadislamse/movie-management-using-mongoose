import { model, Schema } from 'mongoose';
import { TMovie, TReview } from './movie.interface';
import { format } from 'date-fns';
import slugify from 'slugify';

const reviewSchema = new Schema<TReview>({
  email: { type: String, required: true, unique: true },
  //pre hook for unique email
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

// Create the movie Schema
const movieSchema = new Schema<TMovie>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  // releaseDate: { type: Date, required: true },
  releaseDate: { type: String, required: true },
  genre: { type: String, required: true },
  reviews: { type: [reviewSchema], default: [] },
  slug: { type: String },
  //if I use title: unique, then don't need slug property unique
  viewCount: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
});

// // Apply the index for slug if it doesn't already exist
// movieSchema.index({ slug: 1 }, { unique: true });

// ways-1:using pre hook middleware
movieSchema.pre('save', async function (next) {
  if (
    !this.slug ||
    this.isModified('title') ||
    this.isModified('releaseDate')
  ) {
    const date = format(this.releaseDate, 'dd-MM-yyyy');
    this.slug = slugify(`${this.title}-${date}`, { lower: true, strict: true });
  }
  next();
});

/* 
const date = format(this.releaseDate, 'dd-MM-yyyy');
  let newSlug = slugify(`${this.genre}-${date}`, { lower: true, strict: true });

  try {
    let slugExists = await Movie.findOne({ slug: newSlug });
    let counter = 1;
    while (slugExists) {
      newSlug = slugify(`${this.genre}-${date}-${counter}`, {
        lower: true,
        strict: true,
      });
      slugExists = await Movie.findOne({ slug: newSlug });
      counter++;
    }

    this.slug = newSlug; // Set the generated unique slug
    next();
  } catch (err: any) {
    next(err); // Handle any errors during the pre-save process
  } */
/* movieSchema.pre('save', async function (next) {
  const date = format(new Date(this.releaseDate), 'dd-MM-yyyy');
  this.slug = slugify(`${this.genre}-${date}`, { lower: true, strict: true });

  // Check for existing slug
  const existingMovie = await Movie.findOne({ slug: this.slug });
  if (existingMovie) {
    return next(new Error('Duplicate slug error'));
  }

  next();
}); */

// Create the Models
export const Movie = model<TMovie>('Movie', movieSchema);
