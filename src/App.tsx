import { useQuery, useQueryClient } from '@tanstack/react-query'
import './App.css'

function App() {
	const queryClient = useQueryClient()
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
						{data.valueRatio.map(ratio => (
							<div className='card'>
								<h4>{ratio.itemName} </h4>
								<p>Necropolis value: {ratio.necropolisValue}</p>
								<p>Standard value: {ratio.standardValue}</p>
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
