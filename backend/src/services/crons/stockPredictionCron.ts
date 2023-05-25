import { PriceHistoryRepository } from '../../repository/priceHistoryRepository';
import { CompanyRepository } from '../../repository/companyRepository';
import { ICompany } from '../../models/company';
import { PredictedPriceRepository } from '../../repository/predictedPriceRepository';
import axios from 'axios';
//http://127.0.0.1:5000/forecast
//http://43.204.145.181:5000/forecast
const API_ENDPOINT = 'http://127.0.0.1:5000/forecast';

export const fetchCompanyData = async () => {
  const companyRepository = new CompanyRepository();
  const companies: ICompany[] = await companyRepository.findAll();
  const symbols: string[] = companies.map((company) => company.symbol);

  const startDate = new Date('2000-01-01');
  const endDate = new Date(); // today's date

  for (let symbol of symbols) {
    const priceHistoryRepository = new PriceHistoryRepository(symbol);
    const priceData = await priceHistoryRepository.findWithinDateRange(startDate, endDate);
    const predictedPriceRepository = new PredictedPriceRepository(symbol);
    if(priceData.length >= 500){
      predictedPriceRepository.dropCollection()
    }
    if(priceData.length >= 500){
      const response = await axios.post(API_ENDPOINT, priceData);
      const mergedArray = mergeArrays(getNextFiveWorkingDays(), response.data.predictions);
      predictedPriceRepository.insertMany(mergedArray)
    }
  }
}

function getNextFiveWorkingDays() {
  let date = new Date();
  let workingDays = [];

  while (workingDays.length < 5) {
    date.setDate(date.getDate() + 1); // increment the date
    let dayOfWeek = date.getDay();
    
    if (dayOfWeek > 0 && dayOfWeek < 6) { // if it's a weekday (Mon to Fri)
      // you may want to adjust this line based on how you want to format your dates
      workingDays.push(new Date(date)); 
    }
  }

  return workingDays;
}

function mergeArrays(dates: any, predictions: any) {
  return dates.map((date: any, index: any) => ({
    Date_: date.toISOString().split('T')[0], // convert to 'yyyy-mm-dd' format
    Close: predictions[index][0] // access the first element of the nested array
  }));
}