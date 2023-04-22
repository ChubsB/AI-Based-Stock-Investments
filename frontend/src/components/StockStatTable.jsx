import React from 'react';

function StockStatTable({ data }) {
	return (
		<table className="w-full divide-y divide-gray-300 rounded">
			<thead className="bg-white rounded">
				<tr>
					<th className="px-6 py-3 text-center text-primary font-inter text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
						Symbol
					</th>
					<th className="px-6 py-3 text-center text-primary font-inter text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
						Price
					</th>
					<th className="px-6 py-3 text-center text-primary font-inter text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
						Price Change (%)
					</th>
					<th className="px-6 py-3 text-center text-primary font-inter text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
						Volume
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-300">
				{data.map((row, index) => (
					<tr key={index} className="hover:bg-gray-300 transition-all duration-200">
						<td className="px-6 py-2 text-center whitespace-nowrap text-primary font-inter text-sm hover:shadow-lg hover:z-10 transition-all duration-200 font-medium text-gray-500">
							{row.symbol}
						</td>
						<td className="px-6 py-2 text-center whitespace-nowrap text-primary font-inter text-sm hover:shadow-lg hover:z-10 transition-all duration-200 text-gray-500">
							{row.closePrice.toFixed(2)}
						</td>
						<td
							className={`px-6 py-2 text-center whitespace-nowrap text-primary text-sm hover:shadow-lg hover:z-10 transition-all duration-200 ${
								row.priceChangeP > 0
									? 'text-green-600'
									: row.priceChangeP < 0
									? 'text-red-600'
									: 'text-gray-500'
							}`}
						>
							{row.priceChangeP.toFixed(2)}
						</td>
						<td className="px-6 py-2 text-center whitespace-nowrap text-primary text-sm hover:shadow-lg hover:z-10 transition-all duration-200 text-gray-500">
							{row.volume.toLocaleString()}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default StockStatTable;
