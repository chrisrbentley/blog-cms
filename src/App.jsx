import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Dashboard from './components/Dashboard';
import BlogForm from './components/BlogForm';
import Posts from './components/Posts';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		console.log('logging from app.jsx');
		const storedToken = localStorage.getItem('jwt');

		if (storedToken) {
			const decodedToken = jwtDecode(storedToken);

			const tokenExpired = (token) => {
				const expTime = token.exp;
				const currentTime = Math.floor(Date.now() / 1000);

				return expTime < currentTime;
			};

			const isExpired = tokenExpired(decodedToken);

			if (!isExpired) {
				setUser(decodedToken);
			} else {
				localStorage.removeItem('jwt');
				setUser(null);
			}
		}
	}, []);

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<Dashboard
					user={user}
					setUser={setUser}
				/>
			),
		},
		{
			path: 'login',
			element: (
				<Login
					user={user}
					setUser={setUser}
				/>
			),
		},
		{
			path: 'create',
			element: (
				<BlogForm
					user={user}
					setUser={setUser}
				/>
			),
		},
		{
			path: 'posts',
			element: (
				<Posts
					user={user}
					setUser={setUser}
				/>
			),
		},
		{
			path: 'posts/:id',
			element: (
				<BlogForm
					user={user}
					setUser={setUser}
				/>
			),
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
