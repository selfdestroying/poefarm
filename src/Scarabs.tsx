import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'

const Scarabs = () => {
	const { isLoading, isFetching, error, data, refetch } = useQuery({
		queryKey: ['currency'],
		queryFn: () => fetch('/.netlify/functions/scarabs').then(res => res.json()),
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

export default Scarabs
