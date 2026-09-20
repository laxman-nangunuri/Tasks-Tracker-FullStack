import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Task } from './entities/task.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async getAllTasks() {
        return await this.taskRepository.find();
    }

    async getTaskById(id: number) {

        const task = await this.taskRepository.findOne({where: { id },});

        if (!task) {
            throw new NotFoundException(`Task ${id} not found`,);
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto) {
        const task = this.taskRepository.create({
            title: createTaskDto.title,
            description: createTaskDto.description,
        });

        return await this.taskRepository.save(task);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto) {

        const task = await this.taskRepository.findOne({where : {id}});

        if (!task) {
            throw new NotFoundException(`Task with id: ${id} not found`,);
        }

        Object.assign(task, updateTaskDto);

        return await this.taskRepository.save(task);
    }

    async deleteTask(id: number) {
        const task = await this.taskRepository.findOne({where : {id}, });

        if(!task)
        {
            throw new NotFoundException(`Task with id: ${id} not found`,);
        }

        await this.taskRepository.remove(task);

        return { message: `Task ${id} deleted`};
    }
}
