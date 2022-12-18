import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';

import { Task } from './src/tasks/tasks.entity';

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(cors());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

const port = process.env.PORT || 3200;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TS Server...');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully...');

    app.listen(port, () => {
      console.log(`Server started at port ${port}...`);
    });
  })
  .catch((err) => {
    console.error('Error during data source initialization', err);
  });
