import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import InfoBox from '../components/InfoBox';
import PortfolioBox from '../components/PortfolioBox';
import LineGraph from '../components/charts/LineGraph';
import LineData from '../components/charts/lineData.json';
import HistogramGraph from '../components/charts/HistogramGraph';
import histogramData from '../components/charts/histogramData.json';
import { getPortfolioList } from '../api/portfolio';
import { getPriceHistory } from '../api/priceHistory';
import SkeletonLoader from '../components/SkeletonLoader';
import {
	getPortfolioValue,
	getCurrentPortfolioValue,
	getMonthlyReturns,
	getPortfolioStats,
	getMonthlyTotalValues
} from '../helpers/PortfolioValuation';

function DashboardPage() {
	const [activePortfolios, setActivePortfolios] = useState(0);
	const [totalNetworth, setTotalNetworth] = useState(0);
	const [currentValue, setCurrentValue] = useState(0);
	const [monthlyReturns, setMonthlyReturns] = useState([]);
	const [portfolioStats, setPortfolioStats] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getPortfolioList();
			if (!error && data) {
				setActivePortfolios(data.length);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getPortfolioValue();
			if (!error && data) {
				setTotalNetworth(data);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getCurrentPortfolioValue();
			if (!error && data) {
				setCurrentValue(data);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const data = await getMonthlyReturns();
			if (data) {
				setMonthlyReturns(data);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const data = await getMonthlyTotalValues();
			if (data) {
				console.log("Dashboard", data)
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const data = await getPortfolioStats();
			if (data) {
				setPortfolioStats(data);
			}
		}
		fetchData();
	}, []);

	return (
		<DashboardLayout>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row w-full h-[10%] justify-between mx-16">
					<InfoBox
						width="20"
						title="Total Amount Invested"
						value={`Rs ${totalNetworth.toLocaleString()}`}
					></InfoBox>
					<InfoBox
						width="20"
						title="Current Value"
						value={`Rs ${currentValue.toLocaleString()}`}
					></InfoBox>
					<InfoBox
						width="20"
						title="Projected Value (Monthly)"
						value="Rs N/A"
					></InfoBox>
					<InfoBox
						width="20"
						title="Active Portfolios"
						value={activePortfolios}
					></InfoBox>
				</div>
			</div>
			<div className="flex justify-around h-1/2 mt-8">
				<div className="bg-secondayBackground w-3/4 rounded shadow-md">
					<div className="font-inter font-bold text-xl mt-4 ml-10">
						Overall Asset Growth
					</div>
					<LineGraph data={LineData} />
				</div>
				<div className="flex flex-col items-center bg-secondayBackground h-full w-1/5 rounded">
					<div className="font-inter font-semibold text-xl mt-8">
						Portfolio Performance
					</div>
					<div className="font-inter font-light text-md">
						Monthly returns of each portfolio
					</div>
					<div className="w-full h-full">
						{monthlyReturns.length > 0 ? (
							<HistogramGraph data={monthlyReturns} />
						) : (
							<SkeletonLoader />
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center mt-28">
            <div className="font-inter font-Bold text-3xl">Active Portfolios</div>
            <div className="flex flex-row w-full h-[10%] justify-around mx-10 mt-10 mb-32">
                {portfolioStats.map((portfolio, index) => (
                    <PortfolioBox
                        key={index}
                        title={portfolio.portfolioName}
                        value={`Rs ${portfolio.currentValue}`}
                        return={`${portfolio.monthlyReturn}%`}
                    />
                ))}
            </div>
        </div>
		</DashboardLayout>
	);
}

export default DashboardPage;
