import { ISubjectName, ISubjectResponse } from './subject.interface'
import { ITask } from './task.interface'

export interface IVariant {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	result: number
	subjectId: number
	userId: number
}

export interface IVariantResponse {
	id: number
	createdAt: string
	name: string
	result: number
	subjectId: number
	userId: number
	subject: ISubjectName
}

export interface IVariantFull {
	id: number
	createdAt: string
	name: string
	result: number
	subjectId: number
	userId: number
	tasks: ITask[]
	subject: ISubjectResponse
}

export interface IVariantData {
	name: string
	result: number
}
