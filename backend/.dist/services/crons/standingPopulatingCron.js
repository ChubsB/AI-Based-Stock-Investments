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
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateMostActive = exports.populateBiggestLosers = exports.populateBiggestGainers = void 0;
const biggestGainersRepository_1 = require("../../repository/biggestGainersRepository");
const biggestLosersRepository_1 = require("../../repository/biggestLosersRepository");
const mostActiveRepository_1 = require("../../repository/mostActiveRepository");
const companyRepository_1 = require("../../repository/companyRepository");
const priceHistoryRepository_1 = require("../../repository/priceHistoryRepository");
const logger = __importStar(require("../../services/loggingService"));
function populateBiggestGainers() {
    return __awaiter(this, void 0, void 0, function* () {
        const gainers = [];
        const companyRepository = new companyRepository_1.CompanyRepository();
        const companies = yield companyRepository.findAll();
        const biggestGainerRepository = new biggestGainersRepository_1.BiggestGainerRepository();
        // Clear the existing biggest gainers collection
        yield biggestGainerRepository.clear();
        for (const company of companies) {
            const priceHistoryRepository = new priceHistoryRepository_1.PriceHistoryRepository(company.symbol);
            // Replace `previousDate` with the appropriate date for comparison
            const previousDate = new Date();
            previousDate.setDate(previousDate.getDate() - 1);
            const latestPriceData = yield priceHistoryRepository.findLatestPriceData();
            const previousCloseData = yield priceHistoryRepository.findPreviousClose(latestPriceData.Date_);
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
            yield biggestGainerRepository.save(gainer.data);
        }
        logger.info('Biggest Gainers updated');
    });
}
exports.populateBiggestGainers = populateBiggestGainers;
function populateBiggestLosers() {
    return __awaiter(this, void 0, void 0, function* () {
        const losers = [];
        const companyRepository = new companyRepository_1.CompanyRepository();
        const companies = yield companyRepository.findAll();
        const biggestLoserRepository = new biggestLosersRepository_1.BiggestLoserRepository();
        // Clear the existing biggest losers collection
        yield biggestLoserRepository.clear();
        for (const company of companies) {
            const priceHistoryRepository = new priceHistoryRepository_1.PriceHistoryRepository(company.symbol);
            // Replace `previousDate` with the appropriate date for comparison
            const previousDate = new Date();
            previousDate.setDate(previousDate.getDate() - 1);
            const latestPriceData = yield priceHistoryRepository.findLatestPriceData();
            const previousCloseData = yield priceHistoryRepository.findPreviousClose(latestPriceData.Date_);
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
            yield biggestLoserRepository.save(loser.data);
        }
        logger.info('Biggest Losers updated');
    });
}
exports.populateBiggestLosers = populateBiggestLosers;
function populateMostActive() {
    return __awaiter(this, void 0, void 0, function* () {
        const actives = [];
        const companyRepository = new companyRepository_1.CompanyRepository();
        const companies = yield companyRepository.findAll();
        const mostActiveRepository = new mostActiveRepository_1.MostActiveRepository();
        // Clear the existing most active collection
        yield mostActiveRepository.clear();
        for (const company of companies) {
            const priceHistoryRepository = new priceHistoryRepository_1.PriceHistoryRepository(company.symbol);
            const previousDate = new Date();
            previousDate.setDate(previousDate.getDate() - 1);
            const latestPriceData = yield priceHistoryRepository.findLatestPriceData();
            const previousCloseData = yield priceHistoryRepository.findPreviousClose(latestPriceData.Date_);
            if (latestPriceData && previousCloseData) {
                const previousClose = previousCloseData.Close;
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
            yield mostActiveRepository.save(active.data);
        }
        logger.info('Most Active Stocks updated');
    });
}
exports.populateMostActive = populateMostActive;
// Schedule the cron job to run every day at 17:10
// schedule.scheduleJob('10 17 * * *', () => {
// 	console.log('Populating biggest gainers...');
// 	populateBiggestGainers().then(() => {
// 		console.log('Biggest gainers populated.');
// 	}).catch((error) => {
// 		console.error('Error populating biggest gainers:', error);
// 	});
// });
//# sourceMappingURL=standingPopulatingCron.js.map