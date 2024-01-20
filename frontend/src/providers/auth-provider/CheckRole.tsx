import type { PropsWithChildren } from 'react'
import { TypeComponentAuthFields } from './auth-page.types'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

export default function CheckRole({
	Component: { isOnlyUser },
	children
}: PropsWithChildren<TypeComponentAuthFields>) {
	const { user } = useAuth()

	const router = useRouter()

	if (user && isOnlyUser) {
		return <>{children}</>
	}

	router.pathname !== '/auth' && router.replace('/auth')
	return null
}
