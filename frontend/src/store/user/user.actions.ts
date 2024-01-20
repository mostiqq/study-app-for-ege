import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthResponse, INamePassword } from './user.interface'
import authService from '@/services/auth/auth.service'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { errorCatch } from '@/api/api.helper'

export const register = createAsyncThunk<IAuthResponse, INamePassword>(
	'auth/register',
	async (data, thunkApi) => {
		try {
			const response = await authService.main('register', data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, INamePassword>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			const response = await authService.main('login', data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await authService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	}
)
