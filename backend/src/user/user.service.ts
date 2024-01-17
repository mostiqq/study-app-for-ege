import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				subjects: true
			}
		})

		if (!user) {
			throw new Error('Пользователь не найден!')
		}

		return user
	}
}
