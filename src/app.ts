import express, { Application, Request, Response } from 'express';
import { MovieRouters } from './app/movie/movie.routes';
const app: Application = express();
//parser
app.use(express.json());

//api
app.use('/api/movies', MovieRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!');
});

export default app;
