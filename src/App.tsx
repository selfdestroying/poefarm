import { NavLink } from 'react-router-dom'
import { CATEGORIES } from './constants'

const App = () => {
	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			{CATEGORIES.map(category => (
				<NavLink key={category.slug} to={'/' + category.title}>
					{category.title}
				</NavLink>
			))}
		</div>
	)
}

export default App
