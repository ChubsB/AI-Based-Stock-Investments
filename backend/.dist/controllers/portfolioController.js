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
const portfolioRepository_1 = require("../repository/portfolioRepository");
const userRepository_1 = require("../repository/userRepository");
const portfolioRouter = express_1.default.Router();
const portfolioRepo = new portfolioRepository_1.PortfolioRepository();
const userRepo = new userRepository_1.UserRepository();
portfolioRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, name, riskLevel, stocks } = req.body;
    if (!userId || !name || !riskLevel) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = yield userRepo.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const portfolioData = { userId, name, riskLevel, stocks, creationDate: '' };
    const portfolio = yield portfolioRepo.create(portfolioData);
    res.status(201).json(portfolio);
}));
portfolioRouter.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const portfolios = yield portfolioRepo.findByUserId(userId);
    res.json(portfolios);
}));
portfolioRouter.get('/single/:portfolioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { portfolioId } = req.params;
    const portfolio = yield portfolioRepo.findById(portfolioId);
    if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
}));
portfolioRouter.post('/single/:portfolioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { portfolioId } = req.params;
    const updatedData = req.body;
    const updatedPortfolio = yield portfolioRepo.update(portfolioId, updatedData);
    if (!updatedPortfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(updatedPortfolio);
}));
portfolioRouter.post('/:portfolioId/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { portfolioId } = req.params;
    const deletedPortfolio = yield portfolioRepo.delete(portfolioId);
    if (!deletedPortfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(deletedPortfolio);
}));
exports.default = portfolioRouter;
//# sourceMappingURL=portfolioController.js.map