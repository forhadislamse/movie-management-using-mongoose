import { TMovie } from './movie.interface';
import { Movie } from './movie.model';

const createMovieIntoDb = async (movie: TMovie) => {
  const result = await Movie.create(movie);
  return result;
};
export const MovieServices = {
  createMovieIntoDb,
};
