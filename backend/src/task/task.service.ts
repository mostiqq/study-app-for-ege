import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto, ValidateTaskDto } from './task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number, validateDto: ValidateTaskDto) {
		const { variantId, subjectId } = validateDto

		return this.prisma.task.findMany({
			where: {
				userId,
				variantId,
				subjectId
			},
			select: {
				id: true,
				cost: true,
				number: true
			},
			orderBy: {
				cost: 'asc'
			}
		})
	}

	async create(userId: number, dto: TaskDto & ValidateTaskDto) {
		const { subjectId, variantId } = dto
		return this.prisma.task.create({
			data: {
				number: dto.number,
				cost: dto.cost,
				user: {
					connect: {
						id: userId
					}
				},
				subject: {
					connect: {
						id: subjectId
					}
				},
				variant: {
					connect: {
						id: variantId
					}
				}
			}
		})
	}

	async update(id: number, dto: TaskDto, userId: number) {
		return this.prisma.task.update({
			where: {
				id,
				userId
			},
			data: {
				cost: dto.cost,
				number: dto.number
			}
		})
	}

	async delete(id: number, userId: number) {
		return this.prisma.task.delete({
			where: {
				id,
				userId
			}
		})
	}
}
