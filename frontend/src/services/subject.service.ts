import { instance } from '@/api/api.interceptor'
import {
	ISubject,
	ISubjectData,
	ISubjectFull,
	ISubjectResponse
} from '@/types/subject.interface'

class SubjectService {
	async getAll() {
		return instance<ISubject[]>({
			url: `/subjects`,
			method: 'GET'
		})
	}

	async getById(id: string | number) {
		return instance<ISubjectFull>({
			url: `/subjects/${id}`,
			method: 'GET'
		})
	}

	async create(data: ISubjectData) {
		return instance<ISubjectResponse>({
			url: `/subjects`,
			method: 'POST',
			data
		})
	}

	async update(id: number | string, data: ISubjectData) {
		return instance<ISubjectResponse>({
			url: `/subjects/${id}`,
			method: 'PUT',
			data
		})
	}

	async delete(id: number | string) {
		return instance<ISubjectResponse>({
			url: `/subjects/${id}`,
			method: 'DELETE'
		})
	}
}
export default new SubjectService()
