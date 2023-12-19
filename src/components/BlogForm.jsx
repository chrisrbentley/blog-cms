import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import styles from './BlogForm.module.css';
import Header from './Header';
import Submit from './Submit';
import { decode } from 'html-entities';
import { Editor } from '@tinymce/tinymce-react';

const BlogForm = ({ user, setUser }) => {
	let { id } = useParams();
	const [title, setTitle] = useState('');
	const [initialValue, setInitialValue] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPostDetails = async (id) => {
			try {
				const response = await fetch(
					`https://blog-api-production-3581.up.railway.app/posts/${id}`,
				);
				if (response.ok) {
					const data = await response.json();
					setTitle(data.title);
					setInitialValue(data.contentHTML);
				} else console.error('Failed to fetch details');
			} catch (error) {
				console.log(error);
			}
		};

		if (id) {
			fetchPostDetails(id);
		}
	}, [id]);

	const handleForm = (e) => {
		e.preventDefault();

		if (id) {
			updateBlog(JSON.parse(document.activeElement.id));
		} else {
			postBlog(JSON.parse(document.activeElement.id));
		}
	};

	const updateBlog = async (publish) => {
		const token = `Bearer ${localStorage.getItem('jwt').slice(1, -1)}`;

		try {
			const response = await fetch(
				`https://blog-api-production-3581.up.railway.app/posts/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
					body: JSON.stringify({
						title,
						contentHTML: content,
						published: publish,
					}),
				},
			);
			if (response.ok) return navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const postBlog = async (publish) => {
		const token = `Bearer ${localStorage.getItem('jwt').slice(1, -1)}`;
		try {
			const response = await fetch(
				'https://blog-api-production-3581.up.railway.app/posts',
				{
					method: 'POST',
					body: JSON.stringify({
						title,
						contentHTML: content,
						author: user.sub,
						published: publish,
					}),
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				},
			);
			if (response.ok) return navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const deleteBlog = async () => {
		const token = `Bearer ${localStorage.getItem('jwt').slice(1, -1)}`;

		try {
			const response = await fetch(
				`https://blog-api-production-3581.up.railway.app/posts/${id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				},
			);
			if (response.ok) return navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return user ? (
		<>
			<Header
				page={id ? 'Update Post' : 'Create Post'}
				setUser={setUser}
			/>
			<main>
				<form onSubmit={handleForm}>
					<div className={styles.title}>
						<label htmlFor="title">Title</label>
						<input
							id="title"
							name="title"
							type="text"
							placeholder="Enter title here.."
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</div>

					<Editor
						initialValue={id && initialValue ? decode(initialValue) : ''}
						onEditorChange={(newContent, editor) => {
							setContent(newContent);
						}}
						apiKey={import.meta.env.VITE_TINYMCE_API}
						init={{
							plugins:
								'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
							toolbar:
								'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
							tinycomments_mode: 'embedded',
							tinycomments_author: 'Author name',
							mergetags_list: [
								{ value: 'First.Name', title: 'First Name' },
								{ value: 'Email', title: 'Email' },
							],
							ai_request: (request, respondWith) =>
								respondWith.string(() =>
									Promise.reject('See docs to implement AI Assistant'),
								),
							skin: 'oxide-dark',
							content_css: 'dark',

							setup: (editor) => {
								editor.on('init', () => {
									const editorContainer = document.querySelector(
										'.tox .tox-editor-container',
									);
									if (editorContainer) {
										editorContainer.style.margin = '20px';
									}
								});
							},
						}}
					/>

					<div className={styles.buttons}>
						<Submit
							text={id ? 'Update in drafts' : 'Save in drafts'}
							id="false"
						/>
						<Submit
							text={id ? 'Update and Publish' : 'Save and Publish'}
							id="true"
						/>
						{id && (
							<button
								onClick={deleteBlog}
								className={styles.delete}
								type="button"
							>
								Delete
							</button>
						)}
					</div>
				</form>
			</main>
		</>
	) : (
		<Navigate to={'/login'} />
	);
};

export default BlogForm;
