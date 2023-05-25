"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SingleFillIndex = exports.SingleFillCompany = exports.scheduleStockDataPostRequest = exports.scheduleIndexDataPostRequest = exports.fetchKSE100Data = exports.postData = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const axios_1 = __importDefault(require("axios"));
const logger = __importStar(require("../loggingService"));
const priceHistoryRepository_1 = require("../../repository/priceHistoryRepository");
const companyRepository_1 = require("../../repository/companyRepository");
const stockDataFormattingHelper_1 = require("../../helpers/stockDataFormattingHelper");
const kse100Repository_1 = require("../../repository/kse100Repository");
const standingPopulatingCron_1 = require("./standingPopulatingCron");
const API_ENDPOINT = 'https://www.investorslounge.com/Default/SendPostRequest';
//company: string, datefrom: string, dateto: string
const postData = (companySymbol, dateFrom, dateTo) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post(API_ENDPOINT, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = response.data;
        const repository = new priceHistoryRepository_1.PriceHistoryRepository(companySymbol);
        const formattedData = (0, stockDataFormattingHelper_1.convertDateTimeToDate)(data);
        yield repository.insertMany(formattedData);
        logger.info('Request succeeded: ', companySymbol);
    }
    catch (error) {
        if (error.response) {
            logger.error('Request failed with status: ABL/01 Jan 2000/30 Mar 2023', error.response.status);
        }
        else {
            logger.error('Request failed with status: ABL/01 Jan 2000/30 Mar 2023', error.message);
        }
    }
});
exports.postData = postData;
const fetchKSE100Data = (dateFrom, dateTo) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post(API_ENDPOINT, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = response.data;
        const repository = new kse100Repository_1.KSE100Repository();
        yield repository.insertMany(data);
        logger.info('KSE100 data request succeeded');
    }
    catch (error) {
        if (error.response) {
            logger.error('KSE100 data request failed with status:', error.response.status);
        }
        else {
            logger.error('KSE100 data request failed with message:', error.message);
        }
    }
});
exports.fetchKSE100Data = fetchKSE100Data;
const scheduleIndexDataPostRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const cronTime = '0 17 * * 1-5';
    node_schedule_1.default.scheduleJob(cronTime, () => __awaiter(void 0, void 0, void 0, function* () {
        logger.info('Sending POST requests at:', new Date());
        const today = new Date();
        const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
        const repository = new kse100Repository_1.KSE100Repository();
        const latestDate = yield repository.findLatestDate();
        const formattedLatestDate = latestDate
            ? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]} ${latestDate.getFullYear()}`
            : '01 Jan 2000';
    }));
});
exports.scheduleIndexDataPostRequest = scheduleIndexDataPostRequest;
const scheduleStockDataPostRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const cronTime = '0 17 * * 1-5';
    const companyRepository = new companyRepository_1.CompanyRepository();
    const companies = yield companyRepository.findAll();
    node_schedule_1.default.scheduleJob(cronTime, () => __awaiter(void 0, void 0, void 0, function* () {
        logger.info('Sending POST requests at:', new Date());
        const today = new Date();
        const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
        for (const company of companies) {
            const repository = new priceHistoryRepository_1.PriceHistoryRepository(company.symbol);
            const latestDate = yield repository.findLatestDate();
            const formattedLatestDate = latestDate
                ? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]} ${latestDate.getFullYear()}`
                : '01 Jan 2000';
            (0, exports.postData)(company.symbol, formattedLatestDate, formattedToday);
        }
        (0, standingPopulatingCron_1.populateBiggestGainers)().then(() => {
            console.log('Biggest gainers populated.');
        }).catch((error) => {
            console.error('Error populating biggest gainers:', error);
        });
        (0, standingPopulatingCron_1.populateBiggestLosers)().then(() => {
            console.log('Biggest losers populated.');
        }).catch((error) => {
            console.error('Error populating biggest losers:', error);
        });
        (0, standingPopulatingCron_1.populateMostActive)().then(() => {
            console.log('Most active populated.');
        }).catch((error) => {
            console.error('Error populating most active:', error);
        });
    }));
});
exports.scheduleStockDataPostRequest = scheduleStockDataPostRequest;
const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const SingleFillCompany = () => __awaiter(void 0, void 0, void 0, function* () {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const companyRepository = new companyRepository_1.CompanyRepository();
    const companies = yield companyRepository.findAll();
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    for (const company of companies) {
        yield delay(5000);
        const repository = new priceHistoryRepository_1.PriceHistoryRepository(company.symbol);
        // repository.dropCollection()
        const latestDate = yield repository.findLatestDate();
        latestDate.setDate(latestDate.getDate() + 1);
        const formattedLatestDate = latestDate
            ? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]} ${latestDate.getFullYear()}`
            : '01 Jan 2000';
        (0, exports.postData)(company.symbol, formattedLatestDate, formattedToday);
        logger.info('Request succeeded: ', company.symbol, formattedToday, formattedLatestDate);
    }
    (0, standingPopulatingCron_1.populateBiggestGainers)().then(() => {
        console.log('Biggest gainers populated.');
    }).catch((error) => {
        console.error('Error populating biggest gainers:', error);
    });
    (0, standingPopulatingCron_1.populateBiggestLosers)().then(() => {
        console.log('Biggest losers populated.');
    }).catch((error) => {
        console.error('Error populating biggest losers:', error);
    });
    (0, standingPopulatingCron_1.populateMostActive)().then(() => {
        console.log('Most active populated.');
    }).catch((error) => {
        console.error('Error populating most active:', error);
    });
});
exports.SingleFillCompany = SingleFillCompany;
const SingleFillIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    logger.info('Sending POST requests at:', new Date());
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    const repository = new kse100Repository_1.KSE100Repository();
    const latestDate = yield repository.findLatestDate();
    const formattedLatestDate = latestDate
        ? `${latestDate.getDate().toString().padStart(2, '0')} ${monthNames[latestDate.getMonth()]} ${latestDate.getFullYear()}`
        : '01 Jan 2000';
    (0, exports.fetchKSE100Data)(formattedLatestDate, formattedToday);
    logger.info('Request succeeded: ', formattedToday, formattedLatestDate);
});
exports.SingleFillIndex = SingleFillIndex;
//# sourceMappingURL=stockDataCron.js.map