import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { VariantDto } from './variant.dto'

@Injectable()
export class VariantService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number) {
		return this.prisma.variant.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				id: true,
				subject: {
					select: {
						name: true
					}
				},
				createdAt: true,
				name: true,
				result: true,
				subjectId: true,
				userId: true
			}
		})
	}

	async byId(id: number, userId: number) {
		const variant = await this.prisma.variant.findUnique({
			where: {
				id,
				userId
			},
			select: {
				id: true,
				subjectId: true,
				userId: true,
				createdAt: true,
				tasks: true,
				result: true,
				name: true,
				subject: true
			}
		})

		if (!variant) {
			throw new NotFoundException('Вариант не найден!')
		}

		return variant
	}

	async bySubject(userId: number, subjectId: number) {
		const variants = await this.prisma.variant.findMany({
			where: {
				userId,
				subjectId
			},
			select: {
				id: true,
				subjectId: true,
				userId: true,
				createdAt: true,
				tasks: true,
				result: true,
				name: true,
				subject: true
			}
		})

		if (!variants) {
			throw new NotFoundException('Варианты не найдены!')
		}

		return variants
	}

	async create(userId: number, dto: VariantDto, subjectId: number) {
		return this.prisma.variant.create({
			data: {
				name: dto.name,
				result: dto.result,
				user: {
					connect: {
						id: userId
					}
				},
				subject: {
					connect: {
						id: subjectId
					}
				}
			}
		})
	}

	async update(id: number, userId: number, dto: VariantDto) {
		const { name, result } = dto

		return this.prisma.variant.update({
			where: {
				id
			},
			data: {
				name,
				result
			}
		})
	}

	async delete(id: number, userId: number) {
		return this.prisma.variant.delete({
			where: {
				id,
				userId
			}
		})
	}
}
