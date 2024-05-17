import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import {
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom'
import App from './App'
import Page from './Page'
import { CATEGORIES } from './constants'
import './index.css'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
	},
]
for (const category of CATEGORIES) {
	routes.push({
		path: `/${category.title}`,
		element: <Page slug={category.slug} />,
		action: () => {
			return queryClient.refetchQueries()
		},
	})
}
const queryClient = new QueryClient()
const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
)
