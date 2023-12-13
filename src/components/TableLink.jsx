import { Link } from 'react-router-dom';

const TableLink = ({ post }) => {
	return (
		<tr>
			<td>
				<Link to={`/posts/${post._id}`}>{post.title}</Link>
			</td>
			<td>{new Date(post.updatedAt).toLocaleDateString('en-US')}</td>
		</tr>
	);
};

export default TableLink;
