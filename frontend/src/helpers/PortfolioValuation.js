import { getPortfolioList } from '../api/portfolio';
import { getPriceHistory } from '../api/priceHistory';

function subtractDays(date, days) {
  const copyDate = new Date(date);
  copyDate.setDate(copyDate.getDate() - days);
  return copyDate;
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
      let { data: priceHistory, error: priceError } = await getPriceHistory(symbol, startDate, creationDate);

      if (priceError) {
        console.error(`Failed to get price history for ${symbol}: ${priceError}`);
        return { error: priceError };
      }

      // If there's no price history, use the price from 30 days ago.
      if (priceHistory.length === 0) {
        priceHistory = await getPriceHistory(symbol, subtractDays(creationDate, 30), creationDate);
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
		let { data: priceHistory, error: priceError } = await getPriceHistory(symbol, startDate, endDate);
  
		if (priceError) {
		  console.error(`Failed to get price history for ${symbol}: ${priceError}`);
		  return { error: priceError };
		}
  
		// If there's no price history, use the price from 30 days ago.
		if (priceHistory.length === 0) {
		  priceHistory = await getPriceHistory(symbol, subtractDays(endDate, 30), endDate);
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
