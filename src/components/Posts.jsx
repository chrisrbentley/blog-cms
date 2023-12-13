import { useEffect, useState } from 'react';
import Header from './Header';
import TableLink from './TableLink';
import { getAllPosts, getPublished, getDrafts } from '../api/postsApi';
import styles from './Posts.module.css';

const Posts = ({ user }) => {
	const [filter, setFilter] = useState('all');
	const [postsToDisplay, setPostsToDisplay] = useState([]);
	let [all, published, drafts] = [[], [], []];

	const getPosts = async () => {
		const token = `Bearer ${localStorage.getItem('jwt').slice(1, -1)}`;

		[all, published, drafts] = await Promise.all([
			getAllPosts(token),
			getPublished(),
			getDrafts(token),
		]);
	};

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				await getPosts();

				let posts = [];
				if (filter === 'all') {
					posts = all;
				} else if (filter === 'published') {
					posts = published;
				} else if (filter === 'drafts') {
					posts = drafts;
				}

				posts.reverse();
				setPostsToDisplay(posts);
			}
		};

		fetchData();
	}, [user, filter]);

	return (
		<>
			<Header page={'Posts'} />
			<main>
				<section className={styles.tableSection}>
					<div className={styles.filter}>
						<label htmlFor="postType">Filter: </label>
						<select
							name="postType"
							id="postType"
							onChange={(e) => {
								setFilter(e.target.value);
							}}
						>
							<option value="all">All posts</option>
							<option value="published">Published</option>
							<option value="drafts">Drafts</option>
						</select>
					</div>

					<table className={styles.table}>
						<thead>
							<tr>
								<th className={styles.th}>Blog Name</th>
								<th className={styles.th}>Date</th>
							</tr>
						</thead>
						<tbody className={styles.tbody}>
							{postsToDisplay &&
								postsToDisplay.map((post) => {
									return (
										<TableLink
											key={post._id}
											post={post}
										/>
									);
								})}
						</tbody>
					</table>
				</section>
			</main>
		</>
	);
};

export default Posts;
