import { IUser } from '@/types/user.interface'

export interface IUserState {
	name: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface INamePassword {
	name: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
