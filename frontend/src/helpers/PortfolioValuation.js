import { getPortfolioList } from '../api/portfolio';
import { getPriceHistory } from '../api/priceHistory';
import {
	format,
	subYears,
	startOfMonth,
	endOfMonth,
	eachMonthOfInterval,
	isWeekend,
	add,
	sub,
} from 'date-fns';

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
				const price = priceHistory[priceHistory.length - 1]?.Close;
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
				monthlyReturn: parseFloat(monthlyReturn.toFixed(2)),
			});
		}
	}
	return portfolioReturns;
}

export async function getPortfolioStats() {
	// Get the portfolio list
	let { data: portfolioList, error: portfolioError } = await getPortfolioList();

	if (portfolioError) {
		console.error('Failed to fetch portfolio list:', portfolioError);
		return;
	}

	// Prepare an array for portfolio stats
	let portfolioStats = [];

	// Iterate over each portfolio in the list
	for (let portfolio of portfolioList) {
		// For each portfolio, get the current value
		let { data: currentValue, error: currentValueError } =
			await getCurrentPortfolioValue(portfolio);
		if (currentValueError) {
			console.error(
				`Failed to fetch current value for portfolio ${portfolio.portfolioName}:`,
				currentValueError
			);
			continue; // Skip to the next portfolio
		}

		// Get the monthly return
		let { data: monthlyReturn, error: monthlyReturnError } =
			await getMonthlyReturn(portfolio);
		if (monthlyReturnError) {
			console.error(
				`Failed to fetch monthly return for portfolio ${portfolio.portfolioName}:`,
				monthlyReturnError
			);
			continue; // Skip to the next portfolio
		}

		// Add the stats for this portfolio to the array
		portfolioStats.push({
			portfolioName: portfolio.name,
			currentValue: currentValue.toLocaleString(),
			monthlyReturn: parseFloat(monthlyReturn.toFixed(2)),
		});
	}

	// Return the portfolio stats
	return portfolioStats;
}

// Function to adjust date to the nearest weekday
const adjustToWeekday = (date) => {
	if (isWeekend(date)) {
		// If it's Saturday, subtract one day to make it Friday
		// If it's Sunday, add one day to make it Monday
		return date.getDay() === 6
			? sub(date, { days: 1 })
			: add(date, { days: 1 });
	}
	return date;
};

export async function getMonthlyTotalValues() {
	let monthlyValues = [];
	let oldestDate = new Date();
	const { data: portfolioList, error: portfolioError } =
		await getPortfolioList();
	for (let portfolio of portfolioList) {
		if (new Date(portfolio.creationDate) < oldestDate) {
			oldestDate = new Date(portfolio.creationDate);
		}
	}

	const currentDate = new Date();
	const oneYearAgo = subYears(currentDate, 1);

	const startDate =
		oldestDate > oneYearAgo
			? startOfMonth(oldestDate)
			: startOfMonth(oneYearAgo);
	const endDate = endOfMonth(currentDate);

	const allMonths = eachMonthOfInterval({
		start: startDate,
		end: endDate,
	});

	for (let date of allMonths) {
		let totalValue = 0;
		for (let portfolio of portfolioList) {
			if (new Date(portfolio.creationDate) <= date) {
				for (let company of portfolio.stocks) {
					const { data: priceHistory, error: priceError } = await getPriceHistory(
						company.symbol,
						format(adjustToWeekday(startOfMonth(date)), 'yyyy-MM-dd'),
						format(adjustToWeekday(endOfMonth(date)), 'yyyy-MM-dd')
					);
					if (!priceError && priceHistory.length > 0) {
						const price = priceHistory[priceHistory.length - 1]?.Close || 0;
						totalValue += price * company.quantity;
					}
				}
			}
		}

		monthlyValues.push({
			date: format(date, 'yyyy-MM-dd'),
			totalValue,
		});
	}

	return monthlyValues;
}