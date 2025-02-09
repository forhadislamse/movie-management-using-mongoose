import mongoose from 'mongoose';
import { TMovie } from './movie.interface';
import { Movie } from './movie.model';

const createMovieIntoDb = async (movie: TMovie) => {
  const result = await Movie.create(movie);
  return result;
};

const getAllMoviesFromDb = async () => {
  const result = await Movie.find();
  return result;
};

const getMoviesById = async (_id: string) => {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    // Validate ObjectId format
    throw new Error('Invalid Movie ID format');
  }
  const result = await Movie.findById({ _id });
  return result;
};

const getMovieBySlugFromDb = async (slug: string) => {
  const result = await Movie.findOne({ slug: slug });
  return result;
};

const updateMoviesIntoDb = async (id: string, updates: Partial<TMovie>) => {
  const result = await Movie.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updates,
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new Error('Student not found or already deleted');
  }

  return result;
};
export const MovieServices = {
  createMovieIntoDb,
  getAllMoviesFromDb,
  getMoviesById,
  getMovieBySlugFromDb,
  updateMoviesIntoDb,
};
