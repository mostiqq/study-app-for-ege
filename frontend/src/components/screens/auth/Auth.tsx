'use client'
import { Button, Input } from '@chakra-ui/react'
import { FC, useState } from 'react'
import styles from './Auth.module.scss'
import { useRouter } from 'next/navigation'
const Auth: FC = () => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const changeName = (e: any) => {
		setName(e.target.value)
	}

	const changePassword = (e: any) => {
		setPassword(e.target.value)
	}

	const submitHandler = () => {
		if (name.length >= 5 && password.length >= 5) {
			router.replace('/')
		}
	}

	return (
		<div className={styles.main}>
			<h2>Авторизация</h2>
			<Input
				value={name}
				onChange={(e: any) => changeName(e)}
				className={styles.input}
				placeholder='Логин'
				borderColor='black'
			/>
			<Input
				type='password'
				value={password}
				onChange={(e: any) => changePassword(e)}
				className={styles.input}
				placeholder='Пароль'
				borderColor='black'
			/>
			<div className={styles.buttonGroup}>
				<Button
					onClick={() => submitHandler()}
					width={200}
					colorScheme='messenger'
				>
					Войти
				</Button>
				<Button
					onClick={() => submitHandler()}
					width={200}
					colorScheme='messenger'
				>
					Зарегистрироваться
				</Button>
			</div>
		</div>
	)
}
export default Auth
