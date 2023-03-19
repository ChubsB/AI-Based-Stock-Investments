import React from 'react';
import { ResponsiveLine } from '@nivo/line';


const LineGraph = ({data}) => {
	return (
			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'transportation',
					legendOffset: 36,
					legendPosition: 'middle',
				}}
				axisLeft={{
					orient: 'left',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'count',
					legendOffset: -40,
					legendPosition: 'middle',
				}}
				colors={{ scheme: 'greys' }}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor', modifiers: [] }}
				pointLabelYOffset={-12}
				useMesh={true}
				legends={[]}
				motionConfig="slow"
			/>
	);
};

export default LineGraph;
