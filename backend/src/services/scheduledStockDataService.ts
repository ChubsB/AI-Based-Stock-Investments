import schedule from 'node-schedule';
import axios from 'axios';
import * as logger from '../services/loggingService';
import { IPriceHistory } from '../models/priceHistory';
import { PriceHistoryRepository } from '../repository/priceHistoryRepository';
import { CompanyRepository } from '../repository/companyRepository';
import { convertDateTimeToDate } from '../helpers/stockDataFormattingHelper'

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
		console.log(formattedData)
		await repository.insertMany(data);
		logger.info('Request succeeded: ', companySymbol)
	} catch (error) {
		if (error.response) {
			logger.error('Request failed with status: ABL/01 Jan 2000/30 Mar 2023', error.response.status)
		} else {
			logger.error('Request failed with status: ABL/01 Jan 2000/30 Mar 2023', error.message)
		}
	}
};

export const schedulePostRequest = async () => {
	const monthNames = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];
	const cronTime = '0 15 20 * * 1-5';
	const companyRepository = new CompanyRepository();
	const companies = await companyRepository.findAll();
	schedule.scheduleJob(cronTime, async () => {
		logger.info('Sending POST requests at:', new Date());
		const today = new Date();
		const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${
			monthNames[today.getMonth()]
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
	})
}

// const delay = (ms: number) => {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
//   };

// export const testingCompanyData = async () => {
// 	const companyRepository = new CompanyRepository();
// 	const companies = await companyRepository.findAll();
// 	for (const company of companies) {
// 		await delay(5000);
// 		postData(company.symbol, '01 Jan 2000', '31 Mar 2023');
// 		logger.info('Request succeeded: ', company.symbol)
// 	}
// }


