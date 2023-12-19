/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Card from './Card';

const Dashboard = ({ user, setUser }) => {
	if (!user) return <Navigate to={'/login'} />;

	return (
		<>
			<Header
				page={'Dashboard'}
				setUser={setUser}
			/>
			<main>
				<section>
					<Card pageInfo={{ name: 'Create', link: '/create' }} />
					<Card pageInfo={{ name: 'Posts', link: '/posts' }} />
				</section>
			</main>
		</>
	);
};

export default Dashboard;
