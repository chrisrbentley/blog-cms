import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import TableLink from './TableLink';
import { getAllPosts, getPublished, getDrafts } from '../api/postsAPI';
import styles from './Posts.module.css';

const Posts = ({ user, setUser }) => {
	const [filter, setFilter] = useState('all');
	const [postsToDisplay, setPostsToDisplay] = useState([]);

	const [all, setAll] = useState([]);
	const [published, setPublished] = useState([]);
	const [drafts, setDrafts] = useState([]);

	const getPosts = async () => {
		const token = `Bearer ${localStorage.getItem('jwt').slice(1, -1)}`;

		const [allPosts, allPublished, allDrafts] = await Promise.all([
			getAllPosts(token),
			getPublished(),
			getDrafts(token),
		]);

		setAll(allPosts);
		setPublished(allPublished);
		setDrafts(allDrafts);
	};

	useEffect(() => {
		const fetchData = async () => {
			if ((all, published, drafts)) {
				let posts = [];
				if (filter === 'all') {
					posts = all;
				} else if (filter === 'published') {
					posts = published;
				} else if (filter === 'drafts') {
					posts = drafts;
				}

				if (Array.isArray(posts)) {
					posts.reverse();
					setPostsToDisplay(posts);
				} else {
					posts = [];
					setPostsToDisplay(posts);
				}
			}
		};

		fetchData();
	}, [user, filter, all, published, drafts]);

	useEffect(() => {
		if (user) getPosts();
	}, [user]);

	return user ? (
		<>
			<Header
				page={'Posts'}
				setUser={setUser}
			/>
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

					{postsToDisplay.length === 0 ? (
						<p>{filter === 'all' ? 'No posts' : `No ${filter} found`}</p>
					) : (
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
					)}
				</section>
			</main>
		</>
	) : (
		<Navigate to={'/login'} />
	);
};

export default Posts;
