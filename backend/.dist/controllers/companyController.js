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
const express_1 = __importDefault(require("express"));
const companyRepository_1 = require("../repository/companyRepository");
const companyRouter = express_1.default.Router();
const companyRepo = new companyRepository_1.CompanyRepository();
companyRouter.get('/:companyName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName } = req.params;
    // Assuming `findByName()` method returns null if company not found
    const company = yield companyRepo.findByName(companyName);
    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
}));
companyRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield companyRepo.findAllSymbols();
    res.json(companies);
}));
exports.default = companyRouter;
//# sourceMappingURL=companyController.js.map