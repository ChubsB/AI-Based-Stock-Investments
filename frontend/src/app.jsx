import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutWrapper from './layouts/LayoutWrapper';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './layouts/DashboardLayout';
import SideBar from './components/SideBar';
import './app.css';

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<LoginPage />}></Route>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<RegisterPage />} />
			<Route path="/dashboard" element={<DashboardPage/>} />
		</Routes>
	);
}

export default App;
