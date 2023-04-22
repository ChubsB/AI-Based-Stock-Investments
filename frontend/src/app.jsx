import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutWrapper from './layouts/LayoutWrapper';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MarketPage from './pages/MarketPage'
import StocksPage from './pages/StocksPage';
import PortfolioPage from './pages/PortfolioPage';
import './app.css';

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<LoginPage />}></Route>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<RegisterPage />} />
			<Route path="/dashboard" element={<DashboardPage/>} />
			<Route path="/market" element={<MarketPage/>} />
			<Route path="/stocks" element={<StocksPage/>} />
			<Route path="/portfolio" element={<PortfolioPage/>} />
		</Routes>
	);
}

export default App;
