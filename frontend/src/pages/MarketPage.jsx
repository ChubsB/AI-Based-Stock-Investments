import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import InfoBox from '../components/InfoBox';
import LineGraph from '../components/charts/LineGraph';
import LineData from '../components/charts/lineData.json';
import TestGraph from '../components/charts/TestGraph';
import { getIndexHistory } from '../api/indexHistory';
import {
	getMostActive,
	getBiggestGainers,
	getBiggestLosers,
} from '../api/stats';
import SkeletonLoader from '../components/SkeletonLoader';
import StockStatTable from '../components/StockStatTable';
import {
	MdKeyboardDoubleArrowUp,
	MdKeyboardDoubleArrowDown,
	MdCompareArrows,
} from 'react-icons/md';

function MarketPage() {
	const [indexHistoryData, setIndexHistoryData] = useState([]);
	const [mostActiveData, setMostActiveData] = useState([]);
	const [biggestGainerData, setBiggestGainerData] = useState([]);
	const [biggestLoserData, setBiggestLoserData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await getIndexHistory('2017-01-01', '2023-04-13');
			if (data) {
				setIndexHistoryData(data);
			} else {
				console.error('Error fetching price history:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await getMostActive();
			if (data) {
				setMostActiveData(data);
			} else {
				console.error('Error fetching most active:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await getBiggestGainers();
			if (data) {
				setBiggestGainerData(data);
			} else {
				console.error('Error fetching biggest gainers:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await getBiggestLosers();
			if (data) {
				setBiggestLoserData(data);
			} else {
				console.error('Error fetching biggest losers:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<DashboardLayout>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row w-full h-[10%] justify-around mx-16">
					<InfoBox
						width="30"
						title="Market Direction"
						value="Bullish"
					></InfoBox>
					<InfoBox
						width="30"
						title="Market Momentum"
						value="Bullish"
					></InfoBox>
					<InfoBox
						width="30"
						title="Hottest Sector"
						value="Pharmaceuticals"
					></InfoBox>
				</div>
			</div>
			<div className="flex justify-around h-fit mt-8">
				<div className="bg-secondayBackground w-[90%] rounded shadow-md">
					<div className="font-inter font-bold text-xl mt-4 ml-10">KSE-100</div>
					{indexHistoryData.length > 0 ? (
						<TestGraph data={indexHistoryData} />
					) : (
						<SkeletonLoader />
					)}
				</div>
			</div>
			<div className="flex justify-around w-full my-10">
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
					{mostActiveData.length > 0 ? (
						<StockStatTable data={mostActiveData} />
					) : (
						<SkeletonLoader />
					)}
				</div>
				<div className="bg-white rounded">
					<div className="flex mt-6 ml-6">
						<MdKeyboardDoubleArrowUp className="text-4xl mr-2 animate-pulse text-success" />
						<div className="text-primary font-inter font-bold text-left text-2xl">
							Biggest Gainers
						</div>
					</div>
					<div className="text-primary font-inter font-light text-left text-base my-2 ml-6">
						Top 10 best performing stocks for the last trading day.
					</div>
					{biggestGainerData.length > 0 ? (
						<StockStatTable data={biggestGainerData} />
					) : (
						<SkeletonLoader />
					)}
				</div>
				<div className="bg-white rounded">
					<div className="flex mt-6 ml-6">
						<MdKeyboardDoubleArrowDown className="text-4xl mr-2 animate-pulse text-danger" />
						<div className="text-primary font-inter font-bold text-left text-2xl">
							Biggest Losers
						</div>
					</div>
					<div className="text-primary font-inter font-light text-left text-base my-2 ml-6">
						Top 10 worst performing stocks for the last trading day.
					</div>
					<StockStatTable data={biggestLoserData} />
				</div>
			</div>
		</DashboardLayout>
	);
}

export default MarketPage;
