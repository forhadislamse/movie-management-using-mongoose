import express from 'express';
import { MovieControllers } from './movie.controller';
const router = express.Router();

router.post('/', MovieControllers.createMovie);
router.get('/', MovieControllers.getAllMovies);
router.get('/:movieId', MovieControllers.getSingleMovies);
router.put('/:movieId', MovieControllers.updateMovies);

export const MovieRouters = router;
