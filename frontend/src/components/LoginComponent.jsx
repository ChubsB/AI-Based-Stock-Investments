import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { login } from '../api/users';
import ErrorModal from './ErrorModal';

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
});

const LoginComponent = () => {
	const [loginError, setLoginError] = useState('');
	const handleCloseModal = () => {
		setLoginError('');
	};
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
			<div className="bg-secondayBackground shadow-2xl rounded p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
				<h1 className="font-inter text-primary font-bold text-center text-2xl mb-5 mt-16">
					Log in to your account
				</h1>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validationSchema={LoginSchema}
					onSubmit={async (values, { setSubmitting }) => {
						setSubmitting(true);
						const { email, password } = values;
						const { data, error } = await login(email, password);
						if (data) {
							console.log(data);
							// Redirect the user to the desired page after successful login
						} else {
							setLoginError(error);
						}
						setSubmitting(false);
					}}
				>
					{({ errors, touched }) => (
						<Form className="px-8 pt-6 pb-8 mb-4">
							<div className="mb-4">
								<label
									className="font-inter block text-primary text-sm font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<Field
									className={`font-inter shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.email && touched.email ? 'border-red-400' : ''
									}`}
									name="email"
									type="email"
									placeholder="Email"
								/>
								{errors.email && touched.email ? (
									<p className="font-inter text-red-400 text-xs mt-2">
										{errors.email}
									</p>
								) : null}
							</div>
							<div className="mb-4">
								<label
									className="font-inter block text-primary text-sm font-bold mb-2"
									htmlFor="password"
								>
									Password
								</label>
								<Field
									className={`font-inter shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.password && touched.password ? 'border-red-400' : ''
									}`}
									name="password"
									type="password"
									placeholder="Password"
								/>
								{errors.password && touched.password ? (
									<p className="font-inter text-red-400 text-xs mt-2">
										{errors.password}
									</p>
								) : null}
							</div>
							<div className="flex items-center justify-between">
								<button
									className="font-inter bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Log In
								</button>
								<Link
									className="font-inter inline-block align-baseline font-bold text-sm text-primary hover:text-primaryHover"
									to="/forgot-password"
								>
									Forgot Password?
								</Link>
							</div>
						</Form>
					)}
				</Formik>
				<p className="font-inter text-center text-tertiary text-xs mb-8">
					Don't have an account?{' '}
					<Link
						className="font-inter inline-block align-baseline font-bold text-sm text-primary hover:text-primaryHover ml-1"
						to="/signup"
					>
						Sign Up
					</Link>
				</p>
				<p className="font-inter text-center text-tertiary text-xs">
					&copy;2023 Rupi Corp. All rights reserved.
				</p>
			</div>
			{loginError && (
				<ErrorModal message={loginError} onClose={handleCloseModal} />
			)}
		</div>
	);
};

export default LoginComponent;
