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
import PortfolioBar from '../components/charts/PortfolioBar';
import SkeletonLoader from '../components/SkeletonLoader';
import {
	MdCompareArrows,
} from 'react-icons/md';

function PortfolioPage() {
	const [portfolio, setPortfolio] = useState(null);
	const [currentValue, setCurrentValue] = useState(0);
	const [monthlyValues, setMonthlyValues] = useState([]);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const startDate = yesterday.toISOString().split('T')[0];
	const endDate = today.toISOString().split('T')[0];

	useEffect(() => {
		async function fetchData() {
			const userId = '64229b5a265fd76e45965214'; // Replace this with the actual user ID
			const { data, error } = await getPortfolioList(userId);

			if (data) {
				setPortfolio(data[0]);
				getCurrentValue(data[0].stocks).then((value) => setCurrentValue(value));
				getMonthlyPortfolioValues(data[0].stocks).then((value) => setMonthlyValues(value));
			} else {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	const getCurrentValue = async (stocks) => {
		let totalValue = 0;
		for (const stock of stocks) {
		  const symbol = stock.symbol;
		  const quantity = stock.quantity;
		  const endDate = new Date();
		  const startDate = new Date();
		  startDate.setDate(endDate.getDate() - 30); // Subtract 30 days from the endDate
	  
		  const dateFormatterOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		  };
	  
		  const formattedStartDate = startDate.toLocaleDateString(
			'en-CA',
			dateFormatterOptions
		  );
	  
		  const formattedEndDate = endDate.toLocaleDateString(
			'en-CA',
			dateFormatterOptions
		  );
	  
		  const priceHistory = await getPriceHistory(
			symbol,
			formattedStartDate,
			formattedEndDate
		  );
	  
		  const closingPrice =
			priceHistory.data[priceHistory.data.length - 1].Close;
		  totalValue += quantity * closingPrice;
		}
		return totalValue;
	  };

	  const getMonthlyPortfolioValues = async (stocks) => {
		let monthlyValues = [];
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
	  
		for (let month = 0; month <= currentMonth; month++) {
		  const startDate = new Date(currentYear, month, 1);
		  const endDate = new Date(currentYear, month + 1, 0);
		  const dateFormatterOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		  };
		  const formattedStartDate = startDate.toLocaleDateString(
			'en-CA',
			dateFormatterOptions
		  );
		  const formattedEndDate = endDate.toLocaleDateString(
			'en-CA',
			dateFormatterOptions
		  );
		  let monthlyValue = 0;
		  console.log("Loop 1:", formattedStartDate,formattedEndDate)
		  for (const stock of stocks) {
			const symbol = stock.symbol;
			const quantity = stock.quantity;
			const priceHistory = await getPriceHistory(
			  symbol,
			  formattedStartDate,
			  formattedEndDate
			);
			if(priceHistory.data.length == 0) {
				break;
			}
			let closingPrice;
			if(month == currentMonth){
				closingPrice = priceHistory.data[priceHistory.data.length - 1].Close;
			} else {
				closingPrice = priceHistory.data[0].Close;
			}
			monthlyValue += quantity * closingPrice;
		  }
		  if(monthlyValue !== 0){
			monthlyValues.push({
				month: startDate.toLocaleDateString('en-US', {
				  month: 'short',
				  year: 'numeric',
				}),
				value: Math.round(monthlyValue),
			  });
		  }
		}
	  
		return monthlyValues;
	  };  
	
	return (
		<DashboardLayout>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row w-full h-[10%] justify-between mx-16">
					<InfoBox
						width="30"
						title="Portfolio Name"
						value={portfolio ? portfolio.name : 'Loading...'}
					></InfoBox>
					<InfoBox
						width="20"
						title="Current Value"
						value={`Rs ${Math.round(currentValue).toLocaleString()}`}
					></InfoBox>
					<InfoBox
						width="20"
						title="Projected Value (Monthly)"
						value="Rs 1,284,500"
					></InfoBox>
					<InfoBox
						width="20"
						title="Portfolio Momentum"
						value="Bullish"
					></InfoBox>
				</div>
			</div>
			<div className="flex justify-around h-1/2 mt-8">
				<div className="bg-secondayBackground w-[90%] rounded shadow-md p-8">
					<div className="font-inter font-bold text-xl mt-4 ml-10">
						Portfolio Overview
					</div>
					<PortfolioBar data={monthlyValues} />
				</div>
			</div>
			<div className="flex justify-around w-full mt-10">
				<div className="bg-white rounded">
					<div className="flex mt-6 ml-6">
						<MdCompareArrows className="text-4xl mr-2 animate-pulse text-info" />
						<div className="text-primary font-inter font-bold text-left text-2xl">
							Most Active
						</div>
					</div>
					<div className="text-primary font-inter font-light text-left text-base my-2 ml-6">
						Top 10 most active stocks for the last trading day.
					</div>
					{1 > 0 ? (
						<SkeletonLoader />
					) : (
						<SkeletonLoader />
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}

export default PortfolioPage;
