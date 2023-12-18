/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = ({ page }) => {
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
					{page === 'Create Post' ||
						(page === 'Posts' && (
							<li>
								<Link to={'/'}>Home</Link>
							</li>
						))}
					<li>Log Out</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
