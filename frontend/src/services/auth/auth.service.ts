import { getContentType } from '@/api/api.helper'
import { IAuthResponse, INamePassword } from '@/store/user/user.interface'
import axios from 'axios'
import Cookies from 'js-cookie'
import { saveToStorage } from './auth.helper'
import { instance } from '@/api/api.interceptor'

class AuthService {
	async main(type: 'login' | 'register', data: INamePassword) {
		const response = await instance<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response.data
	}

	async getNewTokens() {
		const refreshToken = Cookies.get('refresh-token')

		const response = await axios.post<
			string,
			{
				data: IAuthResponse
			}
		>(
			process.env.SERVER_URL + '/auth/login/access-token',
			{ refreshToken },
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	}
}

export default new AuthService()
