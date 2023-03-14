import React from 'react';
import { Formik, Field, Form } from 'formik';
import LoginComponent from '../components/LoginComponent';
import 'tailwindcss/tailwind.css';

const LoginPage = () => {
  return (
    <div className='flex w-full h-screen'>
      <div className='flex flex-col justify-center items-center bg-primary w-3/5'>
        <div className='text-secondary font-bold text-9xl font-inter mb-8'>Rupi Corp.</div>
        <div className='text-secondary font-light text-3xl font-inter'>Your Personal Investment Advisory</div>
      </div>
      <div className='bg-yellow-500 w-2/5'>
        <LoginComponent></LoginComponent>
      </div>
    </div>
  );
};

export default LoginPage;