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
exports.KSE100Repository = void 0;
const kse100_1 = require("../models/kse100");
class KSE100Repository {
    insertMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield kse100_1.KSE100.insertMany(data);
            }
            catch (error) {
                console.error('Error inserting KSE100 data:', error);
            }
        });
    }
    findWithinDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield kse100_1.KSE100.find({
                    dates_: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                }).sort({ dates_: 1 });
                return data;
            }
            catch (error) {
                console.error('Error fetching KSE100 data within date range:', error);
                throw error;
            }
        });
    }
    findLatestDate() {
        return __awaiter(this, void 0, void 0, function* () {
            const Model = kse100_1.KSE100;
            const latestDocument = yield Model.findOne().sort({ dates_: -1 }).exec();
            return latestDocument ? latestDocument.dates_ : null;
        });
    }
}
exports.KSE100Repository = KSE100Repository;
//# sourceMappingURL=kse100Repository.js.map