import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/auth-provider/auth-page.types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'App for study',
	description: 'Best app for EGE!',
	icons: '/images/favicon.ico'
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode & TypeComponentAuthFields
}>) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider
						Component={{ isOnlyUser: children.Component.isOnlyUser }}
					>
						<html lang='en'>
							<body className={inter.className}>{children}</body>
						</html>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
