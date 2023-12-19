/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = ({ page, setUser }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<header className={styles.header}>
			<h1>{page}</h1>
			<nav>
				<p
					onClick={() => {
						dropdownOpen ? setDropdownOpen(false) : setDropdownOpen(true);
					}}
				>
					Menu
				</p>
				<ul
					className={`${styles.dropdownMenu} ${
						dropdownOpen ? styles.visible : ''
					}`}
				>
					{page !== 'Dashboard' && (
						<li>
							<Link to={'/'}>Home</Link>
						</li>
					)}
					<li>
						<button
							className={styles.logout}
							onClick={() => {
								localStorage.removeItem('jwt');
								setUser(null);
							}}
						>
							Log Out
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
