import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import InfoBox from '../components/InfoBox';
import PortfolioBox from '../components/PortfolioBox';
import StockGraph from '../components/charts/StockGraph';
import LineData from '../components/charts/lineData.json';
import HistogramGraph from '../components/charts/HistogramGraph';
import histogramData from '../components/charts/histogramData.json';
import { getCompanyData, getAllCompanies } from '../api/company';
import SearchBox from '../components/SearchBox';
import { getPriceHistory } from '../api/priceHistory';
import SkeletonLoader from '../components/SkeletonLoader';
import { getPredictedPrice } from '../api/predictedPrice';

function StocksPage() {
	const [companyList, setCompanyList] = useState([]);
	const [currentStock, setCurrentStock] = useState('ENGRO');
	const [priceHistory, setPriceHistory] = useState([]);
	const [predictedPrice, setPredictedPrice] = useState([]);

	function getDates() {
		// Get today's date
		let today = new Date();
		let yearToday = today.getFullYear();
		let monthToday = today.getMonth() + 1; // JavaScript month is 0-based, so add 1
		let dayToday = today.getDate();

		// Get the date 12 months ago
		let yearAgo = new Date();
		yearAgo.setFullYear(today.getFullYear() - 1);
		let monthAgo = yearAgo.getMonth() + 1; // JavaScript month is 0-based, so add 1
		let dayAgo = yearAgo.getDate();

		// Ensure the format is 'yyyy-mm-dd'
		if (monthToday < 10) monthToday = '0' + monthToday;
		if (dayToday < 10) dayToday = '0' + dayToday;
		if (monthAgo < 10) monthAgo = '0' + monthAgo;
		if (dayAgo < 10) dayAgo = '0' + dayAgo;

		// Create the date strings
		let todayString = `${yearToday}-${monthToday}-${dayToday}`;
		let yearAgoString = `${yearAgo.getFullYear()}-${monthAgo}-${dayAgo}`;

		return { todayString, yearAgoString };
	}

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getAllCompanies();
			if (!error && data) {
				setCompanyList(data);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getCompanyData(currentStock);
			if (!error && data) {
				setCurrentStock(data);
			}
		}
		fetchData();
	}, [currentStock]);

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getPredictedPrice(currentStock.symbol);
			if (!error && data) {
				setPredictedPrice(data);
			}
		}
		fetchData();
	}, [currentStock]);

	useEffect(() => {
		async function fetchData() {
			const dates = getDates();
			const { data, error } = await getPriceHistory(
				currentStock.symbol,
				dates.yearAgoString,
				dates.todayString
			);
			if (!error && data) {
				setPriceHistory(data);
			}
		}
		fetchData();
	}, [currentStock]);

	function getRating(currentPrice, predictedPrice) {
		if (currentPrice && predictedPrice) {
			const difference = ((predictedPrice - currentPrice) / currentPrice) * 100;

			if (difference >= 5) {
				return 'High';
			} else if (difference > 2 && difference < 5) {
				return 'Medium';
			} else if (difference >= 0 && difference <= 2) {
				return 'Low';
			} else {
				return 'Avoid';
			}
		}
		return 'Loading...';
	}

	const rating = getRating(
		priceHistory.length > 0
			? priceHistory[priceHistory.length - 1].Close
			: null,
		predictedPrice.length > 0
			? predictedPrice[predictedPrice.length - 1].Close
			: null
	);

	// Compute the CSS class name
	let ratingClass = '';
	let numClass = ''
	switch (rating) {
		case 'High':
			ratingClass = 'text-high';
			numClass = 'text-success'
			break;
		case 'Medium':
			ratingClass = 'text-medium';
			numClass = 'text-success'
			break;
		case 'Low':
			ratingClass = 'text-low';
			numClass = 'text-success'
			break;
		case 'Avoid':
			ratingClass = 'text-danger';
			numClass = 'text-danger'
			break;
		default:
			ratingClass = 'text-default';
			numClass = 'text-secondaryBackground'
	}

	return (
		<DashboardLayout>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row w-full h-[10%] justify-between mx-16">
					<InfoBox
						width="23"
						title="Symbol"
						value={currentStock.symbol}
					></InfoBox>
					<InfoBox
						width="23"
						title="Company Name"
						value={currentStock.name}
					></InfoBox>
					<InfoBox
						width="23"
						title="Sector"
						value={currentStock.sector}
					></InfoBox>
					<SearchBox
						companyList={companyList}
						setCurrentStock={setCurrentStock}
					/>
				</div>
			</div>
			<div className="flex justify-around h-1/2 mt-8">
				<div className="bg-secondayBackground w-3/4 rounded shadow-md">
					<div className="font-inter font-bold text-xl mt-4 ml-10">
						Price History
					</div>
					{priceHistory.length > 0 ? (
						<StockGraph data={priceHistory} newData={predictedPrice}/>
					) : (
						<SkeletonLoader />
					)}
				</div>
				<div className={`flex flex-col justify-center items-center bg-primary text-secondary h-full w-1/5 rounded`}>
					<div className="font-inter font-semibold text-3xl mt-8">
						AI Rating
					</div>
					<div className={`font-inter font-bold text-5xl mt-10 ${ratingClass}`}>
						{getRating(
							priceHistory.length > 0
								? priceHistory[priceHistory.length - 1].Close
								: null,
							predictedPrice.length > 0
								? predictedPrice[predictedPrice.length - 1].Close
								: null
						)}
					</div>
					<div className="font-inter font-semibold text-xl mt-10">
						Current Price:
						{priceHistory.length > 0
							? priceHistory[priceHistory.length - 1].Close.toFixed(2)
							: 'Loading...'}
					</div>
					<div className={`font-inter font-semibold text-xl mt-5 ${numClass}`}>
						Predicted Price:{' '}
						{predictedPrice.length > 0
							? predictedPrice[predictedPrice.length - 1].Close.toFixed(2)
							: 'Loading...'}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

export default StocksPage;
//${ratingClass}