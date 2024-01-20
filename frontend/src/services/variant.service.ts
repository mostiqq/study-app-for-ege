import { instance } from '@/api/api.interceptor'
import { IVariant, IVariantData, IVariantFull } from '@/types/variant.interface'

class VariantService {
	async getAll() {
		return instance<IVariant[]>({
			url: `/variants`,
			method: 'GET'
		})
	}

	async getById(id: string | number) {
		return instance<IVariantFull>({
			url: `/variants/${id}`,
			method: 'GET'
		})
	}

	async getBySubject(id: string | number) {
		return instance<IVariantFull>({
			url: `/variants/by-subject/${id}`,
			method: 'GET'
		})
	}

	async create(data: IVariantData, id: string | number) {
		return instance<IVariant>({
			url: `/variants/by-subject/${id}`,
			method: 'POST',
			data
		})
	}

	async update(id: number | string, data: IVariantData) {
		return instance<IVariant>({
			url: `/variants/${id}`,
			method: 'PUT',
			data
		})
	}

	async delete(id: number | string) {
		return instance<IVariant>({
			url: `/variants/${id}`,
			method: 'DELETE'
		})
	}
}
export default new VariantService()
