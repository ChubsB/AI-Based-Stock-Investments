import React from 'react';
import { ResponsiveLine } from '@nivo/line';


const LineGraph = ({data}) => {
	return (
			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 100, bottom: 50, left: 80 }}
				xScale={{ type: 'point' }}
				yScale={{
					type: 'linear',
					min: 'auto',
					max: 'auto',
					stacked: true,
					reverse: false,
				}}
				yFormat=" >-.2f"
				curve="natural"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					orient: 'bottom',
					tickSize: 15,
					tickPadding: 5,
					tickRotation: 0,
				}}
				axisLeft={{
					orient: 'left',
					tickSize: 15,
					tickPadding: 5,
					tickRotation: 0,
				}}
				colors={() => '#3f3f46'}
				pointColor={() => '#3f3f46'}
				pointBorderWidth={4}
				pointBorderColor={{ from: 'serieColor', modifiers: [] }}
				pointLabelYOffset={-12}
				useMesh={true}
				legends={[]}
				motionConfig="slow"
				layers={[
					"grid",
					"markers",
					"axes",
					"areas",
					"crosshair",
					"line",
					"slices",
					"points",
					"mesh",
					"legends",
					DashedSolidLine 
				  ]}
			/>
	);
};

const DashedSolidLine = ({ series, lineGenerator, xScale, yScale }) => {
	return series.map(({ id, data, color }, index) => (
	  <path
		key={id}
		d={lineGenerator(
		  data.map((d) => ({
			x: xScale(d.data.x),
			y: yScale(d.data.y)
		  }))
		)}
		fill="none"
		stroke={color}
		style={
		  index % 2 === 0
			? {
				strokeDasharray: "3, 6",
				strokeWidth: 3
			  }
			: {
				strokeWidth: 1
			  }
		}
	  />
	));
  };

export default LineGraph;
