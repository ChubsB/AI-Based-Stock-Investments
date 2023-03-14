import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import InfoBox from '../components/InfoBox';

function DashboardPage() {
	return (
		<DashboardLayout>
			<div className="flex justify-center mt-10">
				<div className="flex flex-row w-full justify-between mx-16">
					<InfoBox title="Total Amount Invested" value="Rs 854,500"></InfoBox>
					<InfoBox title="Current Value" value="Rs 1,254,500"></InfoBox>
					<InfoBox title="Projected Value (Monthly)" value="Rs 1,284,500"></InfoBox>
					<InfoBox title="Active Portfolios" value="3"></InfoBox>
				</div>
			</div>
		</DashboardLayout>
	);
}

export default DashboardPage;
