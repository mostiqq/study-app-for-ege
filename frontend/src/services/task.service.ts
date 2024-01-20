import { instance } from '@/api/api.interceptor'
import { ITask, ITaskData, ITaskResponse } from '@/types/task.interface'

class TaskService {
	async getAll(id: string | number) {
		return instance<ITaskResponse[]>({
			url: `/tasks/by-variant/${id}`,
			method: 'GET'
		})
	}

	async create(data: ITaskData, id: string | number) {
		return instance<ITask>({
			url: `/tasks/by-variant/${id}`,
			method: 'POST',
			data
		})
	}

	async update(id: number | string, data: ITaskData) {
		return instance<ITask>({
			url: `/tasks/${id}`,
			method: 'PUT',
			data
		})
	}

	async delete(id: number | string) {
		return instance<ITask>({
			url: `/tasks/${id}`,
			method: 'DELETE'
		})
	}
}
export default new TaskService()
