import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login';
import './App.css';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
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
			path: 'login',
			element: <Login user={user} />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
