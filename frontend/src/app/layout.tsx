import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { TypeComponentAuthFields } from '@/providers/auth-provider/auth-page.types'
import Providers from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Подготовка к ЕГЭ',
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
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
