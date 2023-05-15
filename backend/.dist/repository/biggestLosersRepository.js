"use strict";
// biggestLosersRepository.ts
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
exports.BiggestLoserRepository = void 0;
const biggestLosers_1 = require("../models/biggestLosers");
class BiggestLoserRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const biggestLoser = new biggestLosers_1.BiggestLoser(data);
            return yield biggestLoser.save();
        });
    }
    findTopLosers(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield biggestLosers_1.BiggestLoser.find().sort({ priceChangeP: 1 }).limit(limit).exec();
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield biggestLosers_1.BiggestLoser.deleteMany({}).exec();
        });
    }
}
exports.BiggestLoserRepository = BiggestLoserRepository;
//# sourceMappingURL=biggestLosersRepository.js.map