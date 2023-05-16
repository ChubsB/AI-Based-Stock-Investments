import { getPortfolioList } from '../api/portfolio';
import { getPriceHistory } from '../api/priceHistory';

function subtractDays(date, days) {
	const copyDate = new Date(date);
	copyDate.setDate(copyDate.getDate() - days);
	return copyDate;
}

function formatDate(date) {
	return date.toISOString().split('T')[0];
}

export async function getPortfolioValue() {
	const { data: portfolios, error: portfolioError } = await getPortfolioList();
	if (portfolioError) {
		console.error(`Failed to get portfolios: ${portfolioError}`);
		return { error: portfolioError };
	}

	let totalValue = 0;
	for (const portfolio of portfolios) {
		const { stocks, creationDate } = portfolio;
		const startDate = subtractDays(creationDate, 30);

		for (const stock of stocks) {
			const { symbol, quantity } = stock;
			let { data: priceHistory, error: priceError } = await getPriceHistory(
				symbol,
				startDate,
				creationDate
			);

			if (priceError) {
				console.error(
					`Failed to get price history for ${symbol}: ${priceError}`
				);
				return { error: priceError };
			}

			// If there's no price history, use the price from 30 days ago.
			if (priceHistory.length === 0) {
				priceHistory = await getPriceHistory(
					symbol,
					subtractDays(creationDate, 30),
					creationDate
				);
			}

			if (priceHistory.length > 0) {
				const price = priceHistory[priceHistory.length - 1]?.Close;
				totalValue += price * quantity;
			} else {
				// Handle the case where the array is empty
			}
		}
	}

	return { data: totalValue, error: null };
}

export async function getCurrentPortfolioValue() {
	const { data: portfolios, error: portfolioError } = await getPortfolioList();
	if (portfolioError) {
		console.error(`Failed to get portfolios: ${portfolioError}`);
		return { error: portfolioError };
	}

	let totalCurrentValue = 0;
	const endDate = new Date();
	const startDate = subtractDays(endDate, 30);

	for (const portfolio of portfolios) {
		const { stocks } = portfolio;

		for (const stock of stocks) {
			const { symbol, quantity } = stock;
			let { data: priceHistory, error: priceError } = await getPriceHistory(
				symbol,
				startDate,
				endDate
			);

			if (priceError) {
				console.error(
					`Failed to get price history for ${symbol}: ${priceError}`
				);
				return { error: priceError };
			}

			// If there's no price history, use the price from 30 days ago.
			if (priceHistory.length === 0) {
				priceHistory = await getPriceHistory(
					symbol,
					subtractDays(endDate, 30),
					endDate
				);
			}

			if (priceHistory.length > 0) {
				const price = priceHistory[priceHistory.length - 2]?.Close;
				totalCurrentValue += price * quantity;
			} else {
				// Handle the case where the array is empty
			}
		}
	}

	return { data: totalCurrentValue, error: null };
}

async function getPortfolioValueOnDate(portfolio, date) {
	const { stocks } = portfolio;
	let totalValue = 0;

	for (const stock of stocks) {
		const { symbol, quantity } = stock;
		let { data: priceHistory, error: priceError } = await getPriceHistory(
			symbol,
			formatDate(subtractDays(date, 30)),
			formatDate(date)
		);

		if (priceError) {
			console.error(`Failed to get price history for ${symbol}: ${priceError}`);
			return { error: priceError };
		}

		if (priceHistory.length > 0) {
			const price = priceHistory[priceHistory.length - 1]?.Close;
			totalValue += price * quantity;
		} else {
			// Handle the case where the array is empty
		}
	}

	return totalValue;
}

export async function getMonthlyReturn(portfolio) {
	const endDate = new Date();
	const startDate = subtractDays(endDate, 30);
	const startValue = await getPortfolioValueOnDate(portfolio, startDate);
	const endValue = await getPortfolioValueOnDate(portfolio, endDate);

	const monthlyReturn = ((endValue - startValue) / startValue) * 100;

	return { data: monthlyReturn, error: null };
}

export async function getMonthlyReturns() {
	const portfolioReturns = [];
	const { data: portfolios, error: portfolioError } = await getPortfolioList();
	if (portfolioError) {
		console.error(`Failed to get portfolios: ${portfolioError}`);
		return { error: portfolioError };
	}
	for (const portfolio of portfolios) {
		const { data: monthlyReturn, error } = await getMonthlyReturn(portfolio);

		if (error) {
			console.error(
				`Failed to get monthly return for portfolio ${portfolio.name}: ${error}`
			);
			// Decide whether to continue or break
		} else {
			portfolioReturns.push({
				portfolioName: portfolio.name,
				monthlyReturn: parseFloat((monthlyReturn).toFixed(2)),
			});
		}
	}
	return portfolioReturns;
}
