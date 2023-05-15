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
exports.removeDuplicatesFromAllCompanies = exports.removeDuplicateRecords = void 0;
const kse100_1 = require("../models/kse100"); // Import your KSE100 model and IKSE100 interface
const mongoose_1 = require("mongoose");
const priceHistory_1 = require("../models/priceHistory");
const company_1 = require("../models/company");
function removeDuplicateRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const duplicates = yield kse100_1.KSE100.aggregate([
                {
                    $group: {
                        _id: {
                            dates_: "$dates_",
                            open_value: "$open_value",
                            high_value: "$high_value",
                            low_value: "$low_value",
                            close_value: "$close_value",
                            change_value: "$change_value",
                            volume_value: "$volume_value",
                        },
                        ids: { $addToSet: "$_id" },
                        count: { $sum: 1 },
                    },
                },
                {
                    $match: {
                        count: { $gt: 1 },
                    },
                },
            ]);
            if (duplicates.length === 0) {
                console.log('No duplicate records found.');
                return;
            }
            for (const duplicate of duplicates) {
                // Remove the first item from the ids array, keeping one copy of the record
                duplicate.ids.shift();
                // Delete remaining duplicates
                yield kse100_1.KSE100.deleteMany({ _id: { $in: duplicate.ids.map(mongoose_1.Types.ObjectId) } });
            }
            console.log(`${duplicates.length} duplicate records removed.`);
        }
        catch (error) {
            console.error('Error removing duplicate records:', error);
        }
    });
}
exports.removeDuplicateRecords = removeDuplicateRecords;
function removeDuplicateRecordsFromCompanies(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Model = (0, priceHistory_1.getPriceHistoryModel)(collectionName);
            const duplicates = yield Model.aggregate([
                {
                    $group: {
                        _id: {
                            Date_: "$Date_",
                            Open: "$Open",
                            High: "$High",
                            Low: "$Low",
                            Close: "$Close",
                            Change: "$Change",
                            change_valueP: "$change_valueP",
                            ChangeP: "$ChangeP",
                            Volume: "$Volume",
                        },
                        ids: { $addToSet: "$_id" },
                        count: { $sum: 1 },
                    },
                },
                {
                    $match: {
                        count: { $gt: 1 },
                    },
                },
            ]);
            if (duplicates.length === 0) {
                console.log(`No duplicate records found in collection: ${collectionName}.`);
                return;
            }
            for (const duplicate of duplicates) {
                // Remove the first item from the ids array, keeping one copy of the record
                duplicate.ids.shift();
                // Delete remaining duplicates
                yield Model.deleteMany({ _id: { $in: duplicate.ids.map(mongoose_1.Types.ObjectId) } });
            }
            console.log(`${duplicates.length} duplicate records removed from collection: ${collectionName}.`);
        }
        catch (error) {
            console.error(`Error removing duplicate records from collection: ${collectionName}:`, error);
        }
    });
}
function removeDuplicatesFromAllCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const companies = yield company_1.Company.find({}).exec();
            for (const company of companies) {
                yield removeDuplicateRecordsFromCompanies(company.symbol);
            }
        }
        catch (error) {
            console.error('Error removing duplicates from all companies:', error);
        }
    });
}
exports.removeDuplicatesFromAllCompanies = removeDuplicatesFromAllCompanies;
//# sourceMappingURL=removeDuplicates.js.map