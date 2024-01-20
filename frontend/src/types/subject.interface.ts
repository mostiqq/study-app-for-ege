import { IVariant } from './variant.interface'

export interface ISubject {
	id: number
	name: string
	goal: number
}

export interface ISubjectFull extends ISubject {
	variants: IVariant[]
}

export interface ISubjectData {
	name: string
	goal: number
}

export interface ISubjectResponse {
	id: number
	createdAt: string
	updatedAt: string
	userId: number
	goal: number
	name: string
}
