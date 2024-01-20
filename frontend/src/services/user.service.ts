import { instance } from '@/api/api.interceptor'
import { IUserResponse } from '@/types/user.interface'

class UserService {
	async getProfile() {
		return instance<IUserResponse>({
			url: `/users/profile`,
			method: 'GET'
		})
	}
}
export default new UserService()
