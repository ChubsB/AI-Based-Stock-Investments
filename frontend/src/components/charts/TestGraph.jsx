import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

const TestGraph = ({ data }) => {
	const [timeRange, setTimeRange] = useState('1m');
	
	const filterDataByTimeRange = (data, range) => {
		const now = new Date();
		let dateLimit;

		switch (range) {
			case '1m':
				dateLimit = new Date(now.setMonth(now.getMonth() - 1));
				break;
			case '6m':
				dateLimit = new Date(now.setMonth(now.getMonth() - 6));
				break;
			case '1y':
				dateLimit = new Date(now.setFullYear(now.getFullYear() - 1));
				break;
			case '3y':
				dateLimit = new Date(now.setFullYear(now.getFullYear() - 3));
				break;
			case '5y':
				dateLimit = new Date(now.setFullYear(now.getFullYear() - 5));
				break;
			default:
				dateLimit = new Date(0);
		}
		return data.filter((item) => new Date(item.dates_) >= dateLimit);
	};
	const filteredData = filterDataByTimeRange(data, timeRange);
	const chartData = [
		{
			id: 'close_value',
			data: filteredData.map((item) => ({
				x: item.dates_,
				y: item.close_value,
			})),
		},
	];


	return (
		<div>
			<div className='w-full flex justify-around mt-2'>
				<button className='bg-tertiary rounded p-2' onClick={() => setTimeRange('1m')}>1 Month</button>
				<button className='bg-tertiary rounded p-2' onClick={() => setTimeRange('6m')}>6 Months</button>
				<button className='bg-tertiary rounded p-2' onClick={() => setTimeRange('1y')}>1 Year</button>
				<button className='bg-tertiary rounded p-2' onClick={() => setTimeRange('3y')}>3 Years</button>
				<button className='bg-tertiary rounded p-2' onClick={() => setTimeRange('5y')}>5 Years</button>
			</div>
			<div style={{ height: '400px' }}>
			<ResponsiveLine
				data={chartData}
				margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
				xScale={{ type: 'point' }}
				yScale={{
					type: 'linear',
					min: 'auto',
					max: 'auto',
					stacked: true,
					reverse: false,
				}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					orient: 'bottom',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Date',
					legendOffset: 36,
					legendPosition: 'middle',
					tickValues: [],
				}}
				axisLeft={{
					orient: 'left',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legendPosition: 'middle',
				}}
				colors={() => '#3f3f46'}
				curve="natural"
				pointSize={0}
				theme={{ fontFamily: 'Inter', textColor: '#3f3f46', fontSize: '0.8rem' }}
				pointColor={() => '#3f3f46'}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabel="y"
				pointLabelYOffset={-12}
				enableArea={true}
				useMesh={true}
			/>
		</div>
		</div>
		
	);
};

export default TestGraph;
