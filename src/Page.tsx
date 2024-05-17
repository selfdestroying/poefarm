import { useQuery } from '@tanstack/react-query'
import { CATEGORIES } from './constants'

import { useState } from 'react'
import CategoryLink from './CategoryItem'
import './Page.css'

const Page = ({ slug }: { slug: string }) => {
	const [nameFilter, setNameFilter] = useState('')
	const { isLoading, isFetching, data, refetch } = useQuery({
		queryKey: ['data', slug],
		queryFn: () =>
			fetch('/.netlify/functions/fetchData?slug=' + slug).then(res =>
				res.json()
			),
		refetchOnWindowFocus: false,
	})

	const filterByName = (item: any) => {
		return item.itemName.toLowerCase().includes(nameFilter.toLowerCase())
	}
	return (
		<>
			<div className='nav'>
				{CATEGORIES.map((category, index) => (
					<CategoryLink
						key={index}
						category={category.title}
						icon={category.icon}
						active={slug === category.slug}
					/>
				))}
			</div>
			<div className='main'>
				<div className='header'>
					<button onClick={() => refetch()}>Refresh</button>
					<input
						className='search'
						type='text'
						placeholder='Search...'
						onChange={e => setNameFilter(e.target.value)}
					/>
				</div>
				<div className='container'>
					{isLoading || isFetching ? (
						<p>Loading...</p>
					) : (
						<>
							{data.valueRatio
								.filter(filterByName)
								.map((ratio: any, index: number) => (
									<div className='card' key={index}>
										<h4>{ratio.itemName} </h4>
										<p>Necropolis buying price: {ratio.necropolisValue}</p>
										<p>Standard buying price: {ratio.standardValue}</p>
										<p>Price ratio: {ratio.valueRatio}</p>
									</div>
								))}
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default Page
