import { instanceToPlain } from 'class-transformer';

import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';

export class TaskController {
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  public async getAll(): Promise<Task[]> {
    let allTasks: Task[];

    try {
      allTasks = await this.taskRepository.find({ order: { date: 'ASC' } });
      allTasks = instanceToPlain(allTasks) as Task[];
      return allTasks;
    } catch (error) {
      console.log(error);
    }
  }
}
