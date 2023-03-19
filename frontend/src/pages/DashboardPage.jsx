import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import InfoBox from '../components/InfoBox';
import LineGraph from '../components/charts/LineGraph';
import LineData from '../components/charts/lineData.json';
import HistogramGraph from '../components/charts/HistogramGraph';
import histogramData from '../components/charts/histogramData.json';

function DashboardPage() {
	return (
		<DashboardLayout>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row w-full h-[10%] justify-between mx-16">
					<InfoBox title="Total Amount Invested" value="Rs 854,500"></InfoBox>
					<InfoBox title="Current Value" value="Rs 1,254,500"></InfoBox>
					<InfoBox
						title="Projected Value (Monthly)"
						value="Rs 1,284,500"
					></InfoBox>
					<InfoBox title="Active Portfolios" value="3"></InfoBox>
				</div>
			</div>
			<div className="flex justify-around h-1/2 mt-8">
				<div className="bg-secondayBackground w-3/4 rounded shadow-md">
					<LineGraph data={LineData} />
				</div>
				<div className="flex flex-col items-center bg-secondayBackground h-full w-1/5 rounded">
					<div className="font-inter font-semibold text-xl mt-8">
						Portfolio Performance
					</div>
					<div className="font-inter font-light text-md">
						Monthly returns of each portfolio
					</div>
					<div className='w-full h-full'>
						<HistogramGraph data={histogramData} />
					</div>
				</div>
			</div>
			<div className="flex justify-around h-1/2 mt-8">
				<div className="bg-secondayBackground w-3/4 rounded shadow-md">
					<LineGraph data={LineData} />
				</div>
				<div className="flex flex-col items-center bg-secondayBackground h-full w-1/5 rounded">
					<div className="font-inter font-semibold text-xl mt-8">
						Portfolio Performance
					</div>
					<div className="font-inter font-light text-md">
						Monthly returns of each portfolio
					</div>
					<div className='w-full h-full'>
						<HistogramGraph data={histogramData} />
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

export default DashboardPage;
