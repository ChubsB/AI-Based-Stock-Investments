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
exports.PortfolioRepository = void 0;
const portfolio_1 = require("../models/portfolio");
class PortfolioRepository {
    constructor() {
        this.model = portfolio_1.Portfolio;
    }
    create(portfolioData) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date().toISOString().split('T')[0];
            return this.model.create(Object.assign(Object.assign({}, portfolioData), { creationDate: currentDate }));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findById(id);
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find({ userId });
        });
    }
    update(id, portfolioData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndUpdate(id, portfolioData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findByIdAndRemove(id);
        });
    }
}
exports.PortfolioRepository = PortfolioRepository;
//# sourceMappingURL=portfolioRepository.js.map