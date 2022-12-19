import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';

import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: { date: 'ASC' },
      });
      allTasks = instanceToPlain(allTasks) as Task[];
      return res.status(200).json(allTasks);
    } catch (_error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export const taskController = new TaskController();
