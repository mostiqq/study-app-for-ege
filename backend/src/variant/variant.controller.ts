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
import { VariantService } from './variant.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { VariantDto } from './variant.dto'

@Controller('variants')
export class VariantController {
	constructor(private readonly variantService: VariantService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: number) {
		return this.variantService.getAll(userId)
	}

	@Get(':id')
	@Auth()
	async byId(@Param('id') id: string, @CurrentUser('id') userId: number) {
		return this.variantService.byId(+id, userId)
	}

	@Get('by-subject/:subjectId')
	@Auth()
	async bySubject(
		@CurrentUser('id') userId: number,
		@Param('subjectId') subjectId: string
	) {
		return this.variantService.bySubject(userId, +subjectId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('by-subject/:subjectId')
	async create(
		@CurrentUser('id') userId: number,
		@Body() dto: VariantDto,
		@Param('subjectId') subjectId: string
	) {
		return this.variantService.create(userId, dto, +subjectId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Param('id') id: string,
		@CurrentUser('id') userId: number,
		@Body() dto: VariantDto
	) {
		return this.variantService.update(+id, userId, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string, @CurrentUser('id') userId: number) {
		return this.variantService.delete(+id, userId)
	}
}
