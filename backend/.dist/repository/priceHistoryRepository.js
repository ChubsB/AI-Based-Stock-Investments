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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceHistoryRepository = void 0;
const priceHistory_1 = require("../models/priceHistory");
class PriceHistoryRepository {
    constructor(companyName) {
        this.collectionName = companyName;
    }
    insertMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, priceHistory_1.getPriceHistoryModel)(this.collectionName);
            return yield Model.insertMany(data);
        });
    }
    findLatestDate() {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, priceHistory_1.getPriceHistoryModel)(this.collectionName);
            const latestDocument = yield Model.findOne().sort({ Date_: -1 }).exec();
            return latestDocument ? latestDocument.Date_ : null;
        });
    }
    findWithinDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, priceHistory_1.getPriceHistoryModel)(this.collectionName);
            return yield Model.find({ Date_: { $gte: startDate, $lte: endDate } }).sort({ Date_: 1 }).exec();
        });
    }
    findLatestPriceData() {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, priceHistory_1.getPriceHistoryModel)(this.collectionName);
            return yield Model.findOne().sort({ Date_: -1 }).exec();
        });
    }
    findPreviousClose(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, priceHistory_1.getPriceHistoryModel)(this.collectionName);
            return yield Model.findOne({ Date_: { $lt: date } }).sort({ Date_: -1 }).exec();
        });
    }
}
exports.PriceHistoryRepository = PriceHistoryRepository;
//# sourceMappingURL=priceHistoryRepository.js.map