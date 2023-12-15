/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({ user }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				'https://blog-api-production-3581.up.railway.app/sessions',
				{
					method: 'POST',
					body: JSON.stringify(formData),
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			const data = await response.json();

			if (!response.ok) {
				setErrorMessage(data.message);
				return;
			}

			return localStorage.setItem('jwt', JSON.stringify(data.token));
		} catch (error) {
			console.log(error);
			setErrorMessage('An error occurred, please try again.');
		}
	};

	return !user ? (
		<main className={styles.main}>
			<div className={styles.card}>
				<form
					className={styles.loginForm}
					onSubmit={handleLogin}
				>
					<div className={styles.inputContainer}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							className={styles.input}
							id="username"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							required
							minLength={3}
							maxLength={20}
						/>
					</div>

					<div className={styles.inputContainer}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className={styles.input}
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							required
							minLength={5}
							maxLength={80}
						/>
					</div>

					{errorMessage && <p className={styles.error}>{errorMessage}</p>}

					<button
						type="submit"
						className={styles.submit}
					>
						Login
					</button>
				</form>
			</div>
		</main>
	) : (
		<Navigate to={'/'} />
	);
};

export default Login;
