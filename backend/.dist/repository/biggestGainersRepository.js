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
exports.BiggestGainerRepository = void 0;
const biggestGainers_1 = require("../models/biggestGainers");
class BiggestGainerRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const biggestGainer = new biggestGainers_1.BiggestGainer(data);
            return yield biggestGainer.save();
        });
    }
    findTopGainers(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield biggestGainers_1.BiggestGainer.find().sort({ priceChangeP: -1 }).limit(limit).exec();
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield biggestGainers_1.BiggestGainer.deleteMany({}).exec();
        });
    }
}
exports.BiggestGainerRepository = BiggestGainerRepository;
//# sourceMappingURL=biggestGainersRepository.js.map