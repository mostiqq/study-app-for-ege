import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number, variantId: number) {
		const variant = await this.prisma.variant.findUnique({
			where: {
				id: variantId
			},
			select: {
				subjectId: true
			}
		})

		if (!variant) {
			throw new NotFoundException('Вариант не найден')
		}

		return this.prisma.task.findMany({
			where: {
				userId,
				variantId,
				subjectId: variant.subjectId
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

	async create(userId: number, dto: TaskDto, variantId: number) {
		const variant = await this.prisma.variant.findUnique({
			where: {
				id: variantId
			},
			select: {
				subjectId: true
			}
		})

		if (!variant) {
			throw new NotFoundException('Вариант не найден')
		}

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
						id: variant.subjectId
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
