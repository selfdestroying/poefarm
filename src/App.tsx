import { NavLink } from 'react-router-dom'

const App = () => {
	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			<NavLink to='/currency'>Currency</NavLink>
			<NavLink to='/scarabs'>Scarabs</NavLink>
		</div>
	)
}

export default App
