import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

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

  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);
      createdTask = instanceToPlain(createdTask) as Task;
      return res.status(201).json(createdTask);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
    if (!task) {
      return res
        .status(404)
        .json({ error: 'The task with given ID does not exist.' });
    }

    let updatedTask: UpdateResult;
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export const taskController = new TaskController();
