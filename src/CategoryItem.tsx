import { Link } from 'react-router-dom'

import './CategoryItem.css'

const CategoryLink = ({
	category,
	icon,
	active = false,
}: {
	category: string
	icon: string
	active?: boolean
}) => {
	return (
		<Link
			to={`/${category}`}
			className={`link link-item ${active ? 'active' : ''}`}
		>
			<img src={icon} width={30} />
			<p>{category}</p>
		</Link>
	)
}

export default CategoryLink
