import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';

const app: Express = express();
dotenv.config();

const port = process.env.PORT || 3200;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TS Server...');
});

app.listen(port, () => {
  console.log('Server started...');
});
