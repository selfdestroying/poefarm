import { useQuery } from '@tanstack/react-query'
import './App.css'

function App() {
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
			<button onClick={() => refetch()}>Refresh</button>
			<div className='container'>
				{isLoading || isFetching ? (
					<p>Loading...</p>
				) : (
					<>
						{data.valueRatio.map((ratio: any) => (
							<div className='card'>
								<h4>{ratio.itemName} </h4>
								<p>Necropolis buying price: {ratio.necropolisValue}</p>
								<p>Standard selling price: {ratio.standardValue}</p>
								<p>Value ratio: {ratio.valueRatio}</p>
							</div>
						))}
					</>
				)}
			</div>
		</>
	)
}

export default App
