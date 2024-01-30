'use client'
import { FC, useState } from 'react'
import styles from './Variants.module.scss'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Input,
	Stack,
	Text
} from '@chakra-ui/react'
import Link from 'next/link'

const matemData: any[] = [
	{
		id: 1,
		name: 'Вариант с книги Ященко №1',
		createdAt: '29.01.2024',
		result: 77
	},
	{
		id: 2,
		name: 'Вариант с книги Ященко №2',
		createdAt: '28.01.2024',
		result: 93
	},
	{
		id: 3,
		name: 'Вариант с книги Ященко №3',
		createdAt: '28.01.2024',
		result: 82
	},
	{
		id: 4,
		name: 'Вариант с книги Ященко №4',
		createdAt: '28.01.2024',
		result: 100
	},
	{
		id: 5,
		name: 'Вариант с книги Ященко №5',
		createdAt: '28.01.2024',
		result: 100
	}
]

const infData: any[] = [
	{
		id: 1,
		name: 'Вариант с сайта Кабанова №1',
		createdAt: '29.01.2024',
		result: 100
	},
	{
		id: 2,
		name: 'Вариант с сайта Кабанова №2',
		createdAt: '28.01.2024',
		result: 93
	},
	{
		id: 3,
		name: 'Вариант с сайта Кабанова №3',
		createdAt: '28.01.2024',
		result: 91
	},
	{
		id: 4,
		name: 'Вариант с сайта Кабанова №4',
		createdAt: '28.01.2024',
		result: 99
	}
]

const russData: any[] = [
	{
		id: 1,
		name: 'Вариант со сборника Нарушевича №1',
		createdAt: '30.01.2024',
		result: 93
	},
	{
		id: 2,
		name: 'Вариант со сборника Нарушевича №2',
		createdAt: '28.01.2024',
		result: 85
	}
]

let resultPerv: any = 0

const data: any[] = []

const Variants: FC = () => {
	const [name, setName] = useState('')
	const [subject, setSubject] = useState('')
	const [maxTasks, setMaxTasks] = useState('')
	const [currentTask, setCurrentTask] = useState('1')
	const [isActiveInput, setIsActiveInput] = useState(false)
	const [task, setTask] = useState('')
	const [result, setResult] = useState('')
	const [isEnd, setIsEnd] = useState(false)
	const [isNew, setIsNew] = useState(false)

	const changeName = (e: any) => {
		setName(e.target.value)
	}

	const changeSubject = (e: any) => {
		setSubject(e.target.value)
	}

	const changeResult = (e: any) => {
		setResult(e.target.value)
	}

	const changeMaxTasks = (e: any) => {
		setMaxTasks(e.target.value)
	}

	const changeTask = (e: any) => {
		setTask(e.target.value)
	}

	const submitTasksHandler = () => {
		if (name.length > 0 && subject.length > 0 && +maxTasks > 1) {
			setResult('')
			setIsActiveInput(true)
		}
	}

	const submitEndHandler = () => {
		if (task.length > 0) {
			data.push({
				number: +currentTask,
				result: +task
			})
			resultPerv = resultPerv + +task
			setIsEnd(true)
			setMaxTasks('0')
		}
	}

	const submitNextTask = () => {
		if (task.length > 0) {
			data.push({
				number: +currentTask,
				result: +task
			})
			resultPerv = resultPerv + +task
			setTask('')
			setCurrentTask(`${+currentTask + 1}`)
		}
	}

	const submitResult = () => {
		if (result.length > 0) {
			setIsNew(true)
			setIsEnd(false)
			setIsActiveInput(false)
		}
	}

	return (
		<div className={styles.main}>
			<h2>Мои варианты</h2>
			<div className={styles.bl}>
				<h3 className={styles.add}>Добавить вариант</h3>
				<div
					className={
						!isActiveInput && !isEnd ? styles.addMain : styles.disabled
					}
				>
					<Input
						value={name}
						onChange={(e: any) => changeName(e)}
						className={styles.input}
						placeholder='Название варианта'
						borderColor='black'
						width={500}
					/>
					<Input
						value={subject}
						onChange={(e: any) => changeSubject(e)}
						className={styles.input}
						placeholder='Предмет'
						borderColor='black'
						width={500}
					/>
					<Input
						value={maxTasks}
						onChange={(e: any) => changeMaxTasks(e)}
						className={styles.input}
						placeholder='Кол-во заданий'
						borderColor='black'
						width={500}
					/>
					<Button
						onClick={() => submitTasksHandler()}
						width={200}
						colorScheme='messenger'
					>
						Добавить задания
					</Button>
				</div>

				<div
					className={isActiveInput && !isEnd ? styles.special : styles.disabled}
				>
					<h4 className={styles.titleSpecial}>{`Задание ${currentTask}`}</h4>
					<Input
						value={task}
						onChange={(e: any) => changeTask(e)}
						className={styles.input}
						placeholder={`Балл за задание: ${currentTask}`}
						borderColor='black'
					/>
					{+maxTasks > +currentTask && (
						<Button
							onClick={() => submitNextTask()}
							width={200}
							colorScheme='messenger'
						>
							Следующее
						</Button>
					)}
					{+maxTasks === +currentTask && (
						<>
							<Button
								onClick={() => submitEndHandler()}
								width={200}
								colorScheme='messenger'
							>
								Посмотреть итог
							</Button>
						</>
					)}
				</div>
				<div className={isEnd ? styles.result : styles.disabled}>
					<span
						className={styles.resSpan}
					>{`Ваш итоговый первичный балл - ${resultPerv}`}</span>
					<Link
						className={styles.resLink}
						href='https://4ege.ru/novosti-ege/4023-shkala-perevoda-ballov-ege.html'
						target='_blank'
					>
						Шкала перевода
					</Link>
					<Input
						value={result}
						onChange={(e: any) => changeResult(e)}
						className={styles.input}
						placeholder='Итоговый балл'
						borderColor='black'
					/>
					<Button
						onClick={() => submitResult()}
						width={200}
						colorScheme='messenger'
					>
						Добавить вариант
					</Button>
				</div>
			</div>

			<span className={styles.span}>Математика:</span>
			<div className={styles.flex}>
				{matemData.map(item => (
					<Card width={330} key={item.id} maxW='sm'>
						<CardBody>
							<Stack mt='6' spacing='3'>
								<Heading size='md'>{item.name}</Heading>
								<Text>Создан - {item.createdAt}</Text>
								<Text color='blue.600' fontSize='2xl'>
									Итоговый балл: {item.result}
								</Text>
							</Stack>
						</CardBody>
						<Divider />
					</Card>
				))}
				<Card width={330} className={!isNew ? styles.disabled : ''} maxW='sm'>
					<CardBody>
						<Stack mt='6' spacing='3'>
							<Heading size='md'>{name}</Heading>
							<Text>Создан - 30.01.2024</Text>
							<Text color='blue.600' fontSize='2xl'>
								Итоговый балл: {result}
							</Text>
						</Stack>
					</CardBody>
					<Divider />
				</Card>
			</div>
			<span className={styles.span}>Информатика:</span>
			<div className={styles.flex}>
				{infData.map(item => (
					<Card key={item.id} maxW='sm'>
						<CardBody>
							<Stack mt='6' spacing='3'>
								<Heading size='md'>{item.name}</Heading>
								<Text>Создан - {item.createdAt}</Text>
								<Text color='blue.600' fontSize='2xl'>
									Итоговый балл: {item.result}
								</Text>
							</Stack>
						</CardBody>
						<Divider />
					</Card>
				))}
			</div>

			<span className={styles.span}>Русский язык:</span>
			<div className={styles.flex}>
				{russData.map(item => (
					<Card key={item.id} maxW='sm'>
						<CardBody>
							<Stack mt='6' spacing='3'>
								<Heading size='md'>{item.name}</Heading>
								<Text>Создан - {item.createdAt}</Text>
								<Text color='blue.600' fontSize='2xl'>
									Итоговый балл: {item.result}
								</Text>
							</Stack>
						</CardBody>
						<Divider />
					</Card>
				))}
			</div>
		</div>
	)
}
export default Variants
