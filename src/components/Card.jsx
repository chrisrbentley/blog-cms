/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ pageInfo }) => {
	return (
		<Link
			className={styles.card}
			to={pageInfo.link}
		>
			{pageInfo.name}
		</Link>
	);
};

export default Card;
