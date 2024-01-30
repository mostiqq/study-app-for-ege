import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './user.interface'
import { checkAuth, login, logout, register } from './user.actions'
import { getStoreLocal } from '@/utils/local-storage'

const initialState: IInitialState = {
	user: getStoreLocal('user'),
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})

export const getAllSubj = () => {
	const data = [
		{
			id: 3,
			name: 'Математика',
			goal: 90
		},
		{
			id: 9,
			name: 'Информатика',
			goal: 100
		},
		{
			id: 10,
			name: 'Русский язык',
			goal: 100
		}
	]
	return data
}
