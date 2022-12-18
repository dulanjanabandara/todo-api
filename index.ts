import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const app: Express = express();
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
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
