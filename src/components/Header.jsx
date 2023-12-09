/* eslint-disable react/prop-types */
import styles from './Header.module.css';

const Header = ({ page }) => {
	return (
		<header className={styles.header}>
			<h1>{page}</h1>
		</header>
	);
};

export default Header;
