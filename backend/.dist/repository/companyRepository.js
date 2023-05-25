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
exports.CompanyRepository = void 0;
const company_1 = require("../models/company");
class CompanyRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield company_1.Company.find({});
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield company_1.Company.findOne({ symbol: name });
        });
    }
    findAllSymbols() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield company_1.Company.find({}, { symbol: 1, _id: 0 });
        });
    }
}
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=companyRepository.js.map