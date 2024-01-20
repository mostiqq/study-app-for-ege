export interface ITask {
	id: number
	createdAt: string
	updatedAt: string
	number: number
	cost: number
	variantId: number
	subjectId: number
	userId: number
}

export interface ISubjectVariantData {
	subjectId: number
	variantId: number
}

export interface ITaskResponse {
	id: number
	cost: number
	number: number
}

export interface ITaskData {
	number: number
	cost: number
}
