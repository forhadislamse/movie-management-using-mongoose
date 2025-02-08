import express from 'express';
import { createMovie } from './movie.controller';
const router = express.Router();
router.post('/', createMovie);
export const MovieRouters = router;
