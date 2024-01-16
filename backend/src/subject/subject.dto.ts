import { IsNumber, IsString } from 'class-validator'

export class SubjectDto {
	@IsString()
	name: string

	@IsNumber()
	goal: number
}
