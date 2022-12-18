import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';

import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';

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

app.use('/', taskRouter);