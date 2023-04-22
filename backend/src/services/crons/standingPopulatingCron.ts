import schedule from 'node-schedule';
import { BiggestGainerRepository } from '../../repository/biggestGainersRepository';
import { BiggestLoserRepository } from '../../repository/biggestLosersRepository';
import { MostActiveRepository } from '../../repository/mostActiveRepository';
import { CompanyRepository } from '../../repository/companyRepository';
import { PriceHistoryRepository } from '../../repository/priceHistoryRepository';
import { ICompany } from '../../models/company';
import * as logger from '../../services/loggingService';

export async function populateBiggestGainers() {
	const gainers: Array<{ company: ICompany; priceChangeP: number; data: any }> = [];
	const companyRepository = new CompanyRepository();
	const companies = await companyRepository.findAll();

	const biggestGainerRepository = new BiggestGainerRepository();

	// Clear the existing biggest gainers collection
	await biggestGainerRepository.clear();

	for (const company of companies) {
		const priceHistoryRepository = new PriceHistoryRepository(company.symbol);

		// Replace `previousDate` with the appropriate date for comparison
		const previousDate = new Date();
		previousDate.setDate(previousDate.getDate() - 1);

		const latestPriceData = await priceHistoryRepository.findLatestPriceData();
		const previousCloseData = await priceHistoryRepository.findPreviousClose(latestPriceData.Date_);

		if (latestPriceData && previousCloseData) {
			const previousClose = previousCloseData.Close;
			const priceChange = latestPriceData.Close - previousClose;
			const priceChangeP = (priceChange / previousClose) * 100;

			gainers.push({
				company,
				priceChangeP,
				data: {
					symbol: company.symbol,
					closePrice: latestPriceData.Close,
					priceChange,
					priceChangeP,
					volume: latestPriceData.Volume,
				},
			});
		}
	}
	gainers.sort((a, b) => b.priceChangeP - a.priceChangeP);
	const topGainers = gainers.slice(0, 10);

	for (const gainer of topGainers) {
		await biggestGainerRepository.save(gainer.data);
	}
	logger.info('Biggest Gainers updated')
}

export async function populateBiggestLosers() {
	const losers: Array<{ company: ICompany; priceChangeP: number; data: any }> = [];
	const companyRepository = new CompanyRepository();
	const companies = await companyRepository.findAll();

	const biggestLoserRepository = new BiggestLoserRepository();

	// Clear the existing biggest losers collection
	await biggestLoserRepository.clear();

	for (const company of companies) {
		const priceHistoryRepository = new PriceHistoryRepository(company.symbol);

		// Replace `previousDate` with the appropriate date for comparison
		const previousDate = new Date();
		previousDate.setDate(previousDate.getDate() - 1);

		const latestPriceData = await priceHistoryRepository.findLatestPriceData();
		const previousCloseData = await priceHistoryRepository.findPreviousClose(latestPriceData.Date_);

		if (latestPriceData && previousCloseData) {
			const previousClose = previousCloseData.Close;
			const priceChange = latestPriceData.Close - previousClose;
			const priceChangeP = (priceChange / previousClose) * 100;

			losers.push({
				company,
				priceChangeP,
				data: {
					symbol: company.symbol,
					closePrice: latestPriceData.Close,
					priceChange,
					priceChangeP,
					volume: latestPriceData.Volume,
				},
			});
		}
	}
	losers.sort((a, b) => a.priceChangeP - b.priceChangeP);
	const topLosers = losers.slice(0, 10);

	for (const loser of topLosers) {
		await biggestLoserRepository.save(loser.data);
	}
	logger.info('Biggest Losers updated')
}

export async function populateMostActive() {
	const actives: Array<{ company: ICompany; volume: number; data: any }> = [];
	const companyRepository = new CompanyRepository();
	const companies = await companyRepository.findAll();
  
	const mostActiveRepository = new MostActiveRepository();
  
	// Clear the existing most active collection
	await mostActiveRepository.clear();
  
	for (const company of companies) {
	  const priceHistoryRepository = new PriceHistoryRepository(company.symbol);
  
	  const latestPriceData = await priceHistoryRepository.findLatestPriceData();
  
	  if (latestPriceData) {
		const previousClose = latestPriceData.Close;
		const priceChange = latestPriceData.Close - previousClose;
		const priceChangeP = (priceChange / previousClose) * 100;
  
		actives.push({
		  company,
		  volume: latestPriceData.Volume,
		  data: {
			symbol: company.symbol,
			closePrice: latestPriceData.Close,
			priceChange,
			priceChangeP,
			volume: latestPriceData.Volume,
		  },
		});
	  }
	}
	actives.sort((a, b) => b.volume - a.volume);
	const topActives = actives.slice(0, 10);
  
	for (const active of topActives) {
	  await mostActiveRepository.save(active.data);
	}
	logger.info('Most Active Stocks updated')
  }

// Schedule the cron job to run every day at 17:10
// schedule.scheduleJob('10 17 * * *', () => {
// 	console.log('Populating biggest gainers...');
// 	populateBiggestGainers().then(() => {
// 		console.log('Biggest gainers populated.');
// 	}).catch((error) => {
// 		console.error('Error populating biggest gainers:', error);
// 	});
// });
