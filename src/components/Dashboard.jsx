/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Card from './Card';
import styles from './Dashboard.module.css';

const Dashboard = ({ user, setUser }) => {
	if (!user) return <Navigate to={'/login'} />;

	return (
		<>
			<Header
				page={'Dashboard'}
				setUser={setUser}
			/>
			<main className={styles.dashMain}>
				<section className={styles.cards}>
					<Card pageInfo={{ name: 'Create', link: '/create' }} />
					<Card pageInfo={{ name: 'Posts', link: '/posts' }} />
				</section>
			</main>
		</>
	);
};

export default Dashboard;
