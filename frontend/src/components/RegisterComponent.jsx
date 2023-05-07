import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { signup } from '../api/users';

const RegisterSchema = Yup.object().shape({
	fullName: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
});

const RegisterComponent = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
			<div className="bg-secondayBackground shadow-2xl rounded p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
				<h1 className="font-inter text-primary font-bold text-center text-2xl mb-5 mt-16">
					Start Your Journey With Us!
				</h1>
				<h2 className="font-inter text-primary text-center text-xl mb-5">
					Enter the following details:
				</h2>
				<Formik
					initialValues={{
						fullName: '',
						email: '',
						password: '',
					}}
					validationSchema={LoginSchema}
					onSubmit={async (values) => {
						const { fullName, email, password } = values;
						const { data, error } = await signup(fullName, email, password);
						if (error) {
							console.error('Error:', error);
						} else {
							navigate('/dashboard');
						}
					}}
				>
					{({ errors, touched }) => (
						<Form className="px-8 pt-6 pb-8 mb-4">
							<div className="mb-4">
								<label
									className="font-inter block text-primary text-sm font-bold mb-2"
									htmlFor="fullname"
								>
									Full Name
								</label>
								<Field
									className={`font-inter shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.fullName && touched.fullName ? 'border-red-500' : ''
									}`}
									name="fullName"
									type="fullName"
									placeholder="Full Name"
								/>
								{errors.fullName && touched.fullName ? (
									<p className="font-inter text-red-500 text-xs italic">
										{errors.fullName}
									</p>
								) : null}
							</div>
							<div className="mb-4">
								<label
									className="font-inter block text-primary text-sm font-bold mb-2"
									htmlFor="email"
								>
									Email
								</label>
								<Field
									className={`font-inter shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										errors.email && touched.email ? 'border-red-500' : ''
									}`}
									name="email"
									type="email"
									placeholder="Email"
								/>
								{errors.email && touched.email ? (
									<p className="font-inter text-red-500 text-xs italic">
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
										errors.password && touched.password ? 'border-red-500' : ''
									}`}
									name="password"
									type="password"
									placeholder="Password"
								/>
								{errors.password && touched.password ? (
									<p className="text-red-500 text-xs italic font-inter">
										{errors.password}
									</p>
								) : null}
							</div>
							<div className="flex items-center justify-center">
								<button
									className="font-inter bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Sign Up
								</button>
							</div>
						</Form>
					)}
				</Formik>
				<p className="font-inter text-center text-tertiary text-xs mb-8">
					Already have an account?{' '}
					<Link
						className="font-inter inline-block align-baseline font-bold text-sm text-primary hover:text-primaryHover ml-1"
						to="/login"
					>
						Log In
					</Link>
				</p>
				<p className="text-center text-gray-500 text-xs font-inter">
					&copy;2023 Rupi Corp. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default RegisterComponent;
