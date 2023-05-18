import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const PortfolioBar = ({ data }) => {
	return (
		<ResponsiveBar
			data={data}
			keys={['value']}
			indexBy="month"
			margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
			padding={0.3}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={() => '#3f3f46'}
			borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'Month',
				legendPosition: 'middle',
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'Value',
				legendPosition: 'middle',
				legendOffset: -40,
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={() => '#e4e4e7'}
			animate={true}
			motionConfig="slow"
			motionStiffness={90}
			motionDamping={15}
		/>
	);
};

export default PortfolioBar;
