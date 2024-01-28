import { FC } from 'react'
import styles from './Variants.module.scss'
import {
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
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

const Variants: FC = () => {
	return (
		<div className={styles.main}>
			<h2>Мои варианты</h2>
			<div className={styles.bl}>
				<Link className={styles.link} href='/add-variant'>
					Добавить вариант
				</Link>
			</div>

			<span className={styles.span}>Математика:</span>
			<div className={styles.flex}>
				{matemData.map(item => (
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
						<CardFooter>
							<div className={styles.grp}>
								<Link href={'/variants/' + item.id}>Посмотреть</Link>
							</div>
						</CardFooter>
					</Card>
				))}
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
						<CardFooter>
							<div className={styles.grp}>
								<Link href={'/variants/' + item.id}>Посмотреть</Link>
							</div>
						</CardFooter>
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
						<CardFooter>
							<div className={styles.grp}>
								<Link href={'/variants/' + item.id}>Посмотреть</Link>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
export default Variants
