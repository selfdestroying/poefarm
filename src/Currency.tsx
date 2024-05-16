import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'
import './App.css'

const CATEGORIES = ['Currency', 'Scarab']

function Currency() {
	const { isLoading, isFetching, error, data, refetch } = useQuery({
		queryKey: ['currency'],
		queryFn: () =>
			fetch('/.netlify/functions/currency').then(res => res.json()),
		refetchOnWindowFocus: false,
	})

	if (error) return 'An error has occurred: ' + error.message
	console.log(data)
	return (
		<>
			<div style={{ display: 'flex', gap: '10px' }}>
				<NavLink to='/currency'>Currency</NavLink>
				<NavLink to='/scarabs'>Scarabs</NavLink>
			</div>
			<button onClick={() => refetch()}>Refresh</button>
			<div className='container'>
				{isLoading || isFetching ? (
					<p>Loading...</p>
				) : (
					<>
						{data.valueRatio.map((ratio: any) => (
							<div className='card' key={ratio.itemName}>
								<h4>{ratio.itemName} </h4>
								<p>Necropolis buying price: {ratio.necropolisValue}</p>
								<p>Standard buying price: {ratio.standardValue}</p>
								<p>Price ratio: {ratio.valueRatio}</p>
							</div>
						))}
					</>
				)}
			</div>
		</>
	)
}

export default Currency
