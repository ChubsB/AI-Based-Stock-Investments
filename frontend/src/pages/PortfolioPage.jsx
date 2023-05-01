import React, {useState, useEffect} from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import InfoBox from '../components/InfoBox';
import PortfolioBox from '../components/PortfolioBox';
import LineGraph from '../components/charts/LineGraph';
import LineData from '../components/charts/lineData.json';
import HistogramGraph from '../components/charts/HistogramGraph';
import histogramData from '../components/charts/histogramData.json';
import { getPortfolioList } from '../api/portfolio';
import { getPriceHistory } from '../api/priceHistory';

function PortfolioPage() {
	const [portfolio, setPortfolio] = useState(null);
	const [currentValue, setCurrentValue] = useState(0);
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
			setPortfolio(data[1]);
			console.log(data[1].stocks)
			getCurrentValue(data[1].stocks).then((value) => setCurrentValue(value));
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
		//   const endDate = new Date();
		//   const startDate = new Date();
		//   startDate.setDate(startDate.getDate() - 1);
		  const priceHistory = await getPriceHistory(symbol, '2023-02-26', '2023-02-27');
		  const closingPrice = priceHistory.data[0].Close;
		  totalValue += quantity * closingPrice;
		}
	
		return totalValue;
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
					<InfoBox width="20" title="Portfolio Momentum" value="Bullish"></InfoBox>
				</div>
			</div>
			<div className="flex justify-around h-1/2 mt-8">
				<div className="bg-secondayBackground w-3/4 rounded shadow-md">
					<div className="font-inter font-bold text-xl mt-4 ml-10">
						Portfolio Overview
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
						<HistogramGraph data={histogramData} />
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

export default PortfolioPage;
