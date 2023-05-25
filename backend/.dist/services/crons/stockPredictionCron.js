"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCompanyData = void 0;
const priceHistoryRepository_1 = require("../../repository/priceHistoryRepository");
const companyRepository_1 = require("../../repository/companyRepository");
const predictedPriceRepository_1 = require("../../repository/predictedPriceRepository");
const axios_1 = __importDefault(require("axios"));
//http://127.0.0.1:5000/forecast
//http://43.204.145.181:5000/forecast
const API_ENDPOINT = 'http://127.0.0.1:5000/forecast';
const fetchCompanyData = () => __awaiter(void 0, void 0, void 0, function* () {
    const companyRepository = new companyRepository_1.CompanyRepository();
    const companies = yield companyRepository.findAll();
    const symbols = companies.map((company) => company.symbol);
    const startDate = new Date('2000-01-01');
    const endDate = new Date(); // today's date
    for (let symbol of symbols) {
        const priceHistoryRepository = new priceHistoryRepository_1.PriceHistoryRepository(symbol);
        const priceData = yield priceHistoryRepository.findWithinDateRange(startDate, endDate);
        const predictedPriceRepository = new predictedPriceRepository_1.PredictedPriceRepository(symbol);
        if (priceData.length >= 500) {
            predictedPriceRepository.dropCollection();
        }
        if (priceData.length >= 500) {
            const response = yield axios_1.default.post(API_ENDPOINT, priceData);
            const mergedArray = mergeArrays(getNextFiveWorkingDays(), response.data.predictions);
            predictedPriceRepository.insertMany(mergedArray);
        }
    }
});
exports.fetchCompanyData = fetchCompanyData;
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
function mergeArrays(dates, predictions) {
    return dates.map((date, index) => ({
        Date_: date.toISOString().split('T')[0],
        Close: predictions[index][0] // access the first element of the nested array
    }));
}
//# sourceMappingURL=stockPredictionCron.js.map