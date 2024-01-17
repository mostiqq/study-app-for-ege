import { IsNumber } from 'class-validator'

export class TaskDto {
	@IsNumber()
	number: number

	@IsNumber()
	cost: number
}

export class ValidateTaskDto {
	@IsNumber()
	subjectId: number

	@IsNumber()
	variantId: number
}
