import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SubjectDto } from './subject.dto'

@Injectable()
export class SubjectService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number) {
		return this.prisma.subject.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				name: true,
				goal: true
			}
		})
	}

	async byId(id: number, userId: number) {
		const subject = await this.prisma.subject.findUnique({
			where: {
				id,
				userId
			},
			select: {
				id: true,
				name: true,
				goal: true
			}
		})

		if (!subject) {
			throw new NotFoundException('Предмет не найден!')
		}

		return subject
	}

	async update(id: number, dto: SubjectDto) {
		return this.prisma.subject.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				goal: dto.goal
			}
		})
	}

	async delete(id: number) {
		return this.prisma.subject.delete({
			where: {
				id
			}
		})
	}

	async create(userId: number, dto: SubjectDto) {
		return this.prisma.subject.create({
			data: {
				name: dto.name,
				goal: dto.goal,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}
}
