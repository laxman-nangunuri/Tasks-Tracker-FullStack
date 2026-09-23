import { Body,Param, Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { BasicAuthGuard } from '../auth/basic-auth/basic-auth.guard.js';
import { ApiBasicAuth } from '@nestjs/swagger';

@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) { }

    @Get()
    getTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string)
    {
        return this.tasksService.getTaskById(Number(id));
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto)
    {
        return this.tasksService.createTask(createTaskDto);
    }

    @Put(':id')
    updateTask(@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto)
    {
        return this.tasksService.updateTask(Number(id), updateTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id') id:string)
    {
        return this.tasksService.deleteTask(Number(id));
    }
}
