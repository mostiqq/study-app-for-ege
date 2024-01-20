import { ISubjectResponse } from './subject.interface'

export interface IUser {
	id: number
	name: string
}

export interface IUserResponse extends IUser {
	subjects: ISubjectResponse[]
}
