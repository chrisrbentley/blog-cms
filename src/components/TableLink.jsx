import { Link } from 'react-router-dom';
import styles from './TableLink.module.css';

const TableLink = ({ post }) => {
	return (
		<tr>
			<td>
				<Link
					className={styles.link}
					to={`/posts/${post._id}`}
				>
					{post.title}
				</Link>
			</td>
			<td>{new Date(post.updatedAt).toLocaleDateString('en-US')}</td>
		</tr>
	);
};

export default TableLink;
