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
exports.PredictedPriceRepository = void 0;
const predictedPrice_1 = require("../models/predictedPrice");
class PredictedPriceRepository {
    constructor(companyName) {
        this.collectionName = companyName + 'Predicted';
    }
    insertMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, predictedPrice_1.getPredictedPriceModel)(this.collectionName);
            console.log(`'${this.collectionName}' updated`);
            return yield Model.insertMany(data);
        });
    }
    dropCollection() {
        const Model = (0, predictedPrice_1.getPredictedPriceModel)(this.collectionName);
        Model.collection.drop();
        console.log(`Collection '${this.collectionName}' dropped successfully.`);
    }
    findLatestDate() {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, predictedPrice_1.getPredictedPriceModel)(this.collectionName);
            const latestDocument = yield Model.findOne().sort({ Date_: -1 }).exec();
            return latestDocument ? latestDocument.Date_ : null;
        });
    }
    findLatestPriceData() {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, predictedPrice_1.getPredictedPriceModel)(this.collectionName);
            return yield Model.findOne().sort({ Date_: -1 }).exec();
        });
    }
    findPreviousClose(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, predictedPrice_1.getPredictedPriceModel)(this.collectionName);
            return yield Model.findOne({ Date_: { $lt: date } }).sort({ Date_: -1 }).exec();
        });
    }
    findWithinDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, predictedPrice_1.getPredictedPriceModel)(this.collectionName);
            return yield Model.find({ Date_: { $gte: startDate, $lte: endDate } }).sort({ Date_: 1 }).exec();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = (0, predictedPrice_1.getPredictedPriceModel)(this.collectionName);
            return yield Model.find().exec();
        });
    }
}
exports.PredictedPriceRepository = PredictedPriceRepository;
//# sourceMappingURL=predictedPriceRepository.js.map