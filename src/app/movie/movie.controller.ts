import { Request, Response } from 'express';
import movieValidationSchema from './movie.zodValidation';
import { MovieServices } from './movie.service';

const createMovie = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const movieData = req.body;
    const zodParsedData = movieValidationSchema.parse(movieData);
    const result = await MovieServices.createMovieIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'movie data created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await MovieServices.getAllMoviesFromDb();
    res.status(200).json({
      success: true,
      message: 'get all movie data successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const getSingleMovies = async (req: Request, res: Response) => {
  try {
    // console.log(req.params);
    const { movieId } = req.params;
    const result = await MovieServices.getMoviesById(movieId);
    res.status(200).json({
      success: true,
      message: 'get single movie data successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const updateMovies = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const updates = req.body;
    const result = await MovieServices.updateMoviesIntoDb(movieId, updates);
    res.status(200).json({
      success: true,
      message: 'get single movie data successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const MovieControllers = {
  createMovie,
  getAllMovies,
  getSingleMovies,
  updateMovies,
};
