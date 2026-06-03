import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Task } from './task.entity';

export interface CreateTaskDto {
  name: string;
  description?: string;
  userId?: number;
}

export interface UpdateTaskDto {
  name?: string;
  description?: string | null;
  completed?: boolean;
  userId?: number;
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
    private readonly usersService: UsersService,
  ) {}

  async create(taskData: CreateTaskDto) {
    const task = this.tasksRepo.create({
      name: taskData.name,
      description: taskData.description ?? null,
      completedAt: null,
    });

    if (taskData.userId) {
      task.user = await this.usersService.findOne(taskData.userId);
    }

    return this.tasksRepo.save(task);
  }

  findAll() {
    return this.tasksRepo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} was not found`);
    }

    return task;
  }

  async update(id: number, updateData: UpdateTaskDto) {
    const task = await this.findOne(id);

    if (updateData.name !== undefined) {
      task.name = updateData.name;
    }

    if (updateData.description !== undefined) {
      task.description = updateData.description ?? '';
    }

    if (updateData.completed !== undefined) {
      task.completedAt = updateData.completed ? new Date() : null;
    }

    if (updateData.userId !== undefined) {
      task.user = await this.usersService.findOne(updateData.userId);
    }

    return this.tasksRepo.save(task);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.tasksRepo.delete(id);
    return { deleted: true };
  }
}
