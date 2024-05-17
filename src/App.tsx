import CategoryLink from './CategoryItem'
import { CATEGORIES } from './constants'

const App = () => {
	return (
		<div className='nav'>
			{CATEGORIES.map((category, index) => (
				<CategoryLink
					key={index}
					category={category.title}
					icon={category.icon}
				/>
			))}
		</div>
	)
}

export default App
