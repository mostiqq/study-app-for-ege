import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import * as userActions from '@/store/user/user.actions'

const allActions = {
	...userActions
}

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
