import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const HistogramGraph = ({ data }) => {
    const graphData = data.map(item => ({
        portfolioName: item.portfolioName,
        monthlyReturn: item.monthlyReturn
    }));

    return (
        <ResponsiveBar
            data={graphData}
            keys={['monthlyReturn']}
            indexBy="portfolioName"
            margin={{ top: 50, right: 15, bottom: 50, left: 125 }}
            padding={0.4}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={(bar) => (bar.data.monthlyReturn >= 0 ? '#02ec88' : '#e53529')}
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
                legend: 'monthly return',
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
                return e.id + ': ' + e.formattedValue + ' in portfolio: ' + e.indexValue;
            }}
        />
    )
};

export default HistogramGraph;