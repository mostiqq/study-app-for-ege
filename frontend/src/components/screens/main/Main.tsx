'use client'
import { FC, useEffect, useState } from 'react'
import styles from './Main.module.scss'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Input
} from '@chakra-ui/react'
import subjectService from '@/services/subject.service'
import axios from 'axios'
import { getAllSubj } from '@/store/user/user.slice'
import Link from 'next/link'

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

const Main: FC = () => {
	const [name, setName] = useState('')
	const [goal, setGoal] = useState('')

	const changeName = (e: any) => {
		setName(e.target.value)
	}

	const changeGoal = (e: any) => {
		setGoal(e.target.value)
	}

	const submitHandler = () => {
		const obj = {
			id: 11,
			name: name,
			goal: +goal
		}
		data.push(obj)
		setName('')
		setGoal('')
	}

	return (
		<div className={styles.main}>
			<h2>Главная страница</h2>
			<Accordion
				marginBottom={50}
				style={{
					width: '100%'
				}}
			>
				{data.map(item => (
					<AccordionItem key={item.id}>
						<h2>
							<AccordionButton>
								<Box as='span' flex='1' textAlign='left'>
									{item.name}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							Ваша цель по предмету - {item.goal}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
			<div className={styles.btnGroup}>
				<Link href='/variants'>Посмотреть варианты</Link>
			</div>
			<h2>Добавить предмет</h2>
			<Input
				value={name}
				onChange={(e: any) => changeName(e)}
				className={styles.input}
				placeholder='Название предмета'
				borderColor='black'
			/>
			<Input
				value={goal}
				onChange={(e: any) => changeGoal(e)}
				className={styles.input}
				placeholder='Цель'
				borderColor='black'
			/>
			<Button
				onClick={() => submitHandler()}
				width={200}
				colorScheme='messenger'
			>
				Добавить предмет
			</Button>
		</div>
	)
}
export default Main
