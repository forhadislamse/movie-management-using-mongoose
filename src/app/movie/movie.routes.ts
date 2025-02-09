import express from 'express';
import { MovieControllers } from './movie.controller';
const router = express.Router();

router.post('/', MovieControllers.createMovie);
router.get('/', MovieControllers.getAllMovies);
//conflict if we use /:movieId, /:slug at the same time
router.get('/id/:movieId', MovieControllers.getSingleMovies);
router.get('/slug/:slug', MovieControllers.getMovieBySlug);
router.put('/:movieId', MovieControllers.updateMovies);

export const MovieRouters = router;
