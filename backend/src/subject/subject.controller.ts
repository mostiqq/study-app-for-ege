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
import { SubjectService } from './subject.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SubjectDto } from './subject.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('subjects')
export class SubjectController {
	constructor(private readonly subjectService: SubjectService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') id: number) {
		return this.subjectService.getAll(id)
	}

	@Get(':id')
	@Auth()
	async byId(@Param('id') id: string, @CurrentUser('id') userId: number) {
		return this.subjectService.byId(+id, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: SubjectDto) {
		return this.subjectService.update(+id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') id: number, @Body() dto: SubjectDto) {
		return this.subjectService.create(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.subjectService.delete(+id)
	}
}
