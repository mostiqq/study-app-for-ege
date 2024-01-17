import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TaskService } from './task.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TaskDto, ValidateTaskDto } from './task.dto'

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAll(
		@CurrentUser('id') userId: number,
		@Body() validateDto: ValidateTaskDto
	) {
		return this.taskService.getAll(userId, validateDto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(
		@CurrentUser('id') userId: number,
		@Body() dto: TaskDto & ValidateTaskDto
	) {
		return this.taskService.create(userId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Param('id') id: string,
		@CurrentUser('id') userId: number,
		@Body() dto: TaskDto
	) {
		return this.taskService.update(+id, dto, userId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @CurrentUser('id') userId: number) {
		return this.taskService.delete(+id, userId)
	}
}
