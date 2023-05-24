import schedule from 'node-schedule';
import axios from 'axios';
import * as logger from '../loggingService';
import { IPriceHistory } from '../../models/priceHistory';
import { PriceHistoryRepository } from '../../repository/priceHistoryRepository';
import { CompanyRepository } from '../../repository/companyRepository';
import { convertDateTimeToDate } from '../../helpers/stockDataFormattingHelper'
import { IKSE100 } from '../../models/kse100';
import { KSE100Repository } from '../../repository/kse100Repository';
import { populateBiggestGainers, populateBiggestLosers, populateMostActive } from './standingPopulatingCron';


const API_ENDPOINT = 'https://www.investorslounge.com/Default/SendPostRequest';
//company: string, datefrom: string, dateto: string
export const postData = async (companySymbol: string, dateFrom: string, dateTo: string) => {
	const body = {
		url: 'PriceHistory/GetPriceHistoryCompanyWise',
		data: JSON.stringify({
			company: companySymbol,
			sort: '0',
			DateFrom: dateFrom,
			DateTo: dateTo,
			key: '',
		}),
	};

	try {
		const response = await axios.post(API_ENDPOINT, body, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data: IPriceHistory[] = response.data;
		const repository = new PriceHistoryRepository(companySymbol);
		const formattedData = convertDateTimeToDate(data)
		await repository.insertMany(formattedData);
		logger.info('Request succeeded: ', companySymbol)
	} catch (error) {
		if (error.response) {
			logger.error('Request failed with status: ABL/01 Jan 2000/30 Mar 2023', error.response.status)
		} else {
			logger.error('Request failed with status: ABL/01 Jan 2000/30 Mar 2023', error.message)
		}
	}
};

export const fetchKSE100Data = async (dateFrom: string, dateTo: string) => {
	const body = {
		url: 'stock/IndexHistory',
		data: JSON.stringify({
			Indexid: '2',
			DateFrom: dateFrom,
			DateTo: dateTo,
			key: '',
		}),
	};

	try {
		const response = await axios.post(API_ENDPOINT, body, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data: IKSE100[] = response.data;
		const repository = new KSE100Repository();
		await repository.insertMany(data);
		logger.info('KSE100 data request succeeded');
	} catch (error) {
		if (error.response) {
			logger.error('KSE100 data request failed with status:', error.response.status);
		} else {
			logger.error('KSE100 data request failed with message:', error.message);
		}
	}
};

export const scheduleIndexDataPostRequest = async () => {
	const monthNames = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];
	const cronTime = '0 17 * * 1-5';
	schedule.scheduleJob(cronTime, async () => {
		logger.info('Sending POST requests at:', new Date());
		const today = new Date();
		const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]
			} ${today.getFullYear()}`;
		const repository = new KSE100Repository();
		const latestDate = await repository.findLatestDate();
		const formattedLatestDate = latestDate
			? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]
			} ${latestDate.getFullYear()}`
			: '01 Jan 2000';
	})
}

export const scheduleStockDataPostRequest = async () => {
	const monthNames = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];
	const cronTime = '0 17 * * 1-5';
	const companyRepository = new CompanyRepository();
	const companies = await companyRepository.findAll();
	schedule.scheduleJob(cronTime, async () => {
		logger.info('Sending POST requests at:', new Date());
		const today = new Date();
		const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]
			} ${today.getFullYear()}`;
		for (const company of companies) {
			const repository = new PriceHistoryRepository(company.symbol);
			const latestDate = await repository.findLatestDate();
			const formattedLatestDate = latestDate
				? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]
				} ${latestDate.getFullYear()}`
				: '01 Jan 2000';
			postData(company.symbol, formattedLatestDate, formattedToday);
		}
		populateBiggestGainers().then(() => {
			console.log('Biggest gainers populated.');
		}).catch((error) => {
			console.error('Error populating biggest gainers:', error);
		});
		populateBiggestLosers().then(() => {
			console.log('Biggest losers populated.');
		}).catch((error) => {
			console.error('Error populating biggest losers:', error);
		});
		populateMostActive().then(() => {
			console.log('Most active populated.');
		}).catch((error) => {
			console.error('Error populating most active:', error);
		});
	})
}

const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SingleFillCompany = async () => {
	const monthNames = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];
	const companyRepository = new CompanyRepository();
	const companies = await companyRepository.findAll();
	const today = new Date();
	const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]
		} ${today.getFullYear()}`;
	for (const company of companies) {
		await delay(5000);
		const repository = new PriceHistoryRepository(company.symbol);
		// repository.dropCollection()
		const latestDate = await repository.findLatestDate();
		latestDate.setDate(latestDate.getDate() + 1);
		const formattedLatestDate = latestDate
			? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]
			} ${latestDate.getFullYear()}`
			: '01 Jan 2000';
		postData(company.symbol, formattedLatestDate, formattedToday);
		logger.info('Request succeeded: ', company.symbol, formattedToday, formattedLatestDate)
	}
	populateBiggestGainers().then(() => {
		console.log('Biggest gainers populated.');
	}).catch((error) => {
		console.error('Error populating biggest gainers:', error);
	});
	populateBiggestLosers().then(() => {
		console.log('Biggest losers populated.');
	}).catch((error) => {
		console.error('Error populating biggest losers:', error);
	});
	populateMostActive().then(() => {
		console.log('Most active populated.');
	}).catch((error) => {
		console.error('Error populating most active:', error);
	});
}


export const SingleFillIndex = async () => {
	const monthNames = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];
	logger.info('Sending POST requests at:', new Date());
	const today = new Date();
	const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]
		} ${today.getFullYear()}`;
	const repository = new KSE100Repository();
	const latestDate = await repository.findLatestDate();
	const formattedLatestDate = latestDate
		? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]
		} ${latestDate.getFullYear()}`
		: '01 Jan 2000';
	fetchKSE100Data(formattedLatestDate, formattedToday)
	logger.info('Request succeeded: ', formattedToday, formattedLatestDate)
}


