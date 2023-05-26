import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import NewInfoBox from '../components/NewInfoBox';
import PortfolioBox from '../components/PortfolioBox';
import LineGraph from '../components/charts/LineGraph';
import LineData from '../components/charts/lineData.json';
import HistogramGraph from '../components/charts/HistogramGraph';
import histogramData from '../components/charts/histogramData.json';
import { getPortfolioList } from '../api/portfolio';
import { getPriceHistory } from '../api/priceHistory';
import PortfolioBar from '../components/charts/PortfolioBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { MdAnalytics, MdBalance } from 'react-icons/md';
import PortfolioTable from '../components/PortfolioTable';
import PortfolioDropdown from '../components/PortfolioDropdown';
import { getSinglePredictedPortfolioValue } from '../helpers/PortfolioValuation';
import EditableInfoBox from '../components/EditableInfoBox';
import { GiBullHorns, GiBearFace } from 'react-icons/gi';
import StockGraph from '../components/charts/StockGraph';
import { getPredictedPrice } from '../api/predictedPrice';
import { getAllCompanies } from '../api/company';
import InfoBox from '../components/InfoBox';

function CreatePortfolio() {
	const [portfolioName, setPortfolioName] = useState('');
	const [investmentValue, setInvestmentValue] = useState(0);
	const [allPortfolios, setAllPortfolios] = useState([]);
	const [companyList, setCompanyList] = useState([]);
	const [portfolios, setPortfolios] = useState([]);
	const [selectedPortfolio, setSelectedPortfolio] = useState(null); // New state variable

	const [selectedRiskLevel, setSelectedRiskLevel] = useState('High Risk');

	const handlePortfolioName = (event) => {
		setPortfolioName(event.target.value);
	};

	const handleInvestmentValue = (event) => {
		setInvestmentValue(event.target.value);
	};

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getAllCompanies();
			if (!error && data) {
				setCompanyList(data);
				setPortfolios(createPortfolios(data));
			}
		}
		fetchData();
	}, []);

	async function useCompanyData(companySymbols) {
		const allCompanyData = [];
		const today = new Date();
		const startDate = new Date();
		startDate.setDate(today.getDate() - 7);

		const formatDate = (date) => {
			let d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;

			return [year, month, day].join('-');
		};

		const formattedToday = formatDate(today);
		const formattedStartDate = formatDate(startDate);

		for (let companyObj of companySymbols) {
			const companyName = companyObj.symbol;
			const priceHistoryResult = await getPriceHistory(
				companyName,
				formattedStartDate,
				formattedToday
			);
			const predictedPriceResult = await getPredictedPrice(companyName);
			if (
				!priceHistoryResult.error &&
				priceHistoryResult.data &&
				!predictedPriceResult.error &&
				predictedPriceResult.data
			) {
				const lastHistoricalPrice =
					priceHistoryResult.data[priceHistoryResult.data.length - 1]?.Close;
				const lastPredictedPrice =
					predictedPriceResult.data[predictedPriceResult.data.length - 1]
						?.Close;

				if (lastHistoricalPrice && lastPredictedPrice) {
					const percentChange =
						((lastPredictedPrice - lastHistoricalPrice) / lastHistoricalPrice) *
						100;
					allCompanyData.push({ companyName, percentChange });
				}
			}
		}

		allCompanyData.sort((a, b) => a.percentChange - b.percentChange);
		return allCompanyData;
	}

	async function createPortfolios(companySymbols) {
		const companyData = await useCompanyData(companySymbols);
		const positivePerformingCompanies = companyData.filter(
			(company) => company.percentChange > 0
		);
		const sortedCompanies = positivePerformingCompanies.sort(
			(a, b) => b.percentChange - a.percentChange
		);

		const portfolios = [];

		for (let i = 0; i < 3; i++) {
			const riskLevel = ['High', 'Medium', 'Low'][i];
			const startIndex = i * 10;
			const endIndex = (i + 1) * 10;

			const portfolioCompanies = sortedCompanies.slice(startIndex, endIndex);

			const portfolio = {
				name: `${riskLevel} Risk`,
				companies: [],
				weeklyReturn: 0,
			};

			for (let j = 0; j < portfolioCompanies.length; j++) {
				const company = portfolioCompanies[j];
				const { companyName, percentChange } = company;

				const predictedPriceResult = await getPredictedPrice(companyName);

				if (!predictedPriceResult.error && predictedPriceResult.data) {
					const predictedPrices = predictedPriceResult.data;
					const lastHistoricalPrice =
						predictedPrices[predictedPrices.length - 2]?.Close;
					const lastPredictedPrice =
						predictedPrices[predictedPrices.length - 1]?.Close;

					if (lastHistoricalPrice && lastPredictedPrice) {
						const weeklyReturn =
							((lastPredictedPrice - lastHistoricalPrice) /
								lastHistoricalPrice) *
							100;
						portfolio.weeklyReturn +=
							(percentChange / portfolioCompanies.length) * weeklyReturn;
						if (weeklyReturn > 35) {
							weeklyReturn == 31.1;
						}
						portfolio.companies.push({
							symbol: companyName,
							quantity: 100,
							price: lastPredictedPrice,
							weeklyReturn,
						});
					}
				}
			}

			portfolios.push(portfolio);
		}

		console.log(portfolios);
		return portfolios;
	}

	const handleBoxClick = (riskLevel) => {
		setSelectedRiskLevel(riskLevel);
		const selectedPortfolio = portfolios.find(
			(portfolio) => portfolio.name === `${riskLevel} Risk`
		);
		setSelectedPortfolio(selectedPortfolio ? selectedPortfolio : null); // update selectedPortfolio
	};

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await getAllCompanies();
			if (!error && data) {
				setCompanyList(data);
				const portfolios = await createPortfolios(data);
				setPortfolios(portfolios); // set the portfolios to state
			}
		}
		fetchData();
	}, []);

	return (
		<DashboardLayout>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row w-full h-[10%] justify-between mx-16">
					<NewInfoBox
						width={30}
						title="Risk Level"
						value="High"
						Icon={GiBullHorns}
						isSelected={selectedRiskLevel === 'High'}
						onClick={() => handleBoxClick('High')}
					></NewInfoBox>
					<NewInfoBox
						width={30}
						title="Risk Level"
						value="Medium"
						Icon={MdBalance}
						isSelected={selectedRiskLevel === 'Medium'}
						onClick={() => handleBoxClick('Medium')}
					></NewInfoBox>
					<NewInfoBox
						width={30}
						title="Risk Level"
						value="Low"
						Icon={GiBearFace}
						isSelected={selectedRiskLevel === 'Low'}
						onClick={() => handleBoxClick('Low')}
					></NewInfoBox>
				</div>
			</div>
			<div className="flex justify-around w-full my-10">
				<div className="bg-white rounded w-4/5">
					<div className="flex mt-6 ml-6">
						<MdAnalytics className="text-4xl mr-2 animate-pulse text-success" />
						<div className="text-primary font-inter font-bold text-left text-2xl">
							Stocks
						</div>
					</div>
					<div className="text-primary font-inter font-light text-left text-base my-2 ml-6">
						current holdings for this portfolio
					</div>
					{selectedPortfolio && selectedPortfolio.companies.length > 0 ? (
						<PortfolioTable data={selectedPortfolio.companies} />
					) : (
						<SkeletonLoader />
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}

export default CreatePortfolio;
