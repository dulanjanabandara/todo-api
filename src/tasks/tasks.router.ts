import { Router } from 'express';

import { taskController } from './tasks.controller';
import { createValidator } from './tasks.validator';

export const taskRouter: Router = Router();

taskRouter.get('/tasks', taskController.getAll);
taskRouter.post('/tasks', createValidator, taskController.create);
