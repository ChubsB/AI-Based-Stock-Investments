import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const transformData = (data) => {
	return [
	  {
		id: "Close",
		data: data.map((item) => ({
		  x: new Date(item.Date_).toISOString().split('T')[0], // gets 'YYYY-MM-DD'
		  y: item.Close,
		})),
	  },
	];
  };


const StockGraph = ({data}) => {
	const transformedData = transformData(data);
	return (
			<ResponsiveLine
			data={transformedData}
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
	);
};

// const DashedSolidLine = ({ series, lineGenerator, xScale, yScale }) => {
// 	return series.map(({ id, data, color }, index) => (
// 	  <path
// 		key={id}
// 		d={lineGenerator(
// 		  data.map((d) => ({
// 			x: xScale(d.data.x),
// 			y: yScale(d.data.y)
// 		  }))
// 		)}
// 		fill="none"
// 		stroke={color}
// 		style={
// 		  index % 2 === 0
// 			? {
// 				strokeDasharray: "3, 6",
// 				strokeWidth: 3
// 			  }
// 			: {
// 				strokeWidth: 1
// 			  }
// 		}
// 	  />
// 	));
//   };

export default StockGraph;
