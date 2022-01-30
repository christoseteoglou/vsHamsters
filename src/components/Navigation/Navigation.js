import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav>
			<NavLink activeClassName="ActiveLink" exact to="/">
				{' '}
				Home{' '}
			</NavLink>
			<NavLink activeClassName="ActiveLink" to="/Gallery">
				{' '}
				Gallery{' '}
			</NavLink>
			<NavLink activeClassName="ActiveLink" to="/Battle">
				{' '}
				Battle
			</NavLink>
			<NavLink activeClassName="ActiveLink" to="/Add">
				{' '}
				Add
			</NavLink>
		</nav>
	);
};

export default Navigation;
