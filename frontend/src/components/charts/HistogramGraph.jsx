import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const HistogramGraph = ({ data }) => {
	return (
<ResponsiveBar
		data={data}
		keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
		indexBy="country"
		margin={{ top: 50, right: 40, bottom: 50, left: 80 }}
		padding={0.4}
		layout="horizontal"
		valueScale={{ type: 'linear' }}
		indexScale={{ type: 'band', round: true }}
		colors={() => '#3f3f46'}
		defs={[
			{
				id: 'dots',
				type: 'patternDots',
				background: 'inherit',
				color: '#38bcb2',
				size: 4,
				padding: 1,
				stagger: true,
			},
			{
				id: 'lines',
				type: 'patternLines',
				background: 'inherit',
				color: '#eed312',
				rotation: -45,
				lineWidth: 6,
				spacing: 10,
			},
		]}
		fill={[
			{
				match: {
					id: 'fries',
				},
				id: 'dots',
			},
			{
				match: {
					id: 'sandwich',
				},
				id: 'lines',
			},
		]}
		borderColor={{
			from: 'color',
			modifiers: [['darker', '1.5']],
		}}
		axisTop={null}
		axisRight={null}
		axisBottom={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: 'percentage change',
			legendPosition: 'middle',
			legendOffset: 32,
		}}
		labelSkipWidth={12}
		labelSkipHeight={12}
		labelTextColor={() => '#e4e4e7'}
		legends={[]}
		motionConfig="slow"
		role="application"
		ariaLabel="Nivo bar chart demo"
		barAriaLabel={function (e) {
			return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
		}}
	/>
	)
};

export default HistogramGraph;