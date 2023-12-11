import Header from './Header';
import { Editor } from '@tinymce/tinymce-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Create.module.css';

const Create = ({ user }) => {
	const [title, setTitle] = useState();
	const [content, setContent] = useState();
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		postBlog(JSON.parse(document.activeElement.id));
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
			console.log(response);
			if (response.ok) return navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return user ? (
		<>
			<Header page={'Create Post'}></Header>
			<main className={styles.main}>
				<form onSubmit={onSubmit}>
					<div className={styles.title}>
						<label htmlFor="Title">Title</label>
						<input
							id="title"
							name="title"
							type="text"
							placeholder="Enter title here.."
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</div>

					<Editor
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
						<button
							type="submit"
							id="false"
						>
							Save
						</button>
						<button
							type="submit"
							id="true"
						>
							Save and Publish
						</button>
					</div>
				</form>
			</main>
		</>
	) : (
		<Navigate to={'/login'} />
	);
};

export default Create;
