import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Currency from './Currency.tsx'
import Scarabs from './Scarabs.tsx'
import './index.css'

const queryClient = new QueryClient()
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/currency',
		element: <Currency />,
	},
	{
		path: '/scarabs',
		element: <Scarabs />,
	},
])
ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
)
