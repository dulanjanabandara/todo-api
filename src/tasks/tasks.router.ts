import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { TaskController } from './tasks.controller';
import { createValidator } from './tasks.validator';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', async (req: Request, res: Response) => {
  const taskController = new TaskController();
  const allTasks = await taskController.getAll();
  res.status(200).json(allTasks);
});

taskRouter.post(
  '/tasks',
  createValidator,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const taskController = new TaskController();
    //   const task = await taskController.createPost();
    //   res.status(200).json(task);
  },
);
