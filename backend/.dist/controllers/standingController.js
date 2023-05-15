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
const biggestGainersRepository_1 = require("../repository/biggestGainersRepository");
const biggestLosersRepository_1 = require("../repository/biggestLosersRepository");
const mostActiveRepository_1 = require("../repository/mostActiveRepository");
const standingRouter = express_1.default.Router();
const gainerRepository = new biggestGainersRepository_1.BiggestGainerRepository();
const loserRepository = new biggestLosersRepository_1.BiggestLoserRepository();
const activeRepository = new mostActiveRepository_1.MostActiveRepository();
standingRouter.get('/top-gainers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = 10;
        const topGainers = yield gainerRepository.findTopGainers(limit);
        res.json(topGainers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching top gainers', error });
    }
}));
standingRouter.get('/top-losers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = 10;
        const topLosers = yield loserRepository.findTopLosers(limit);
        res.json(topLosers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching top losers', error });
    }
}));
standingRouter.get('/most-active', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = 10;
        const mostActive = yield activeRepository.findMostActive(limit);
        res.json(mostActive);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching most active stocks', error });
    }
}));
exports.default = standingRouter;
//# sourceMappingURL=standingController.js.map