import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './auth.dto'
import { hash } from 'argon2'
import { User } from '@prisma/client'
import { verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			name: user.name
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				name: dto.name
			}
		})

		if (!user) {
			throw new NotFoundException('Пользователь не найден!')
		}

		const isValid = await verify(user.password, dto.password)

		if (!isValid) {
			throw new UnauthorizedException('Неправильный пароль!')
		}

		return user
	}

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.user.findUnique({
			where: {
				name: dto.name
			}
		})

		if (oldUser) {
			throw new BadRequestException(
				'Пользователь с таким именем уже существует!'
			)
		}

		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				password: await hash(dto.password)
			}
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueTokens(userId: number) {
		const data = { id: userId }
		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) {
			throw new UnauthorizedException('Invalid refresh token')
		}
		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}
}
