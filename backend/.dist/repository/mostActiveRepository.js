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
exports.MostActiveRepository = void 0;
const mostActive_1 = require("../models/mostActive");
class MostActiveRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const mostActive = new mostActive_1.MostActive(data);
            return yield mostActive.save();
        });
    }
    findMostActive(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mostActive_1.MostActive.find().sort({ volume: -1 }).limit(limit).exec();
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mostActive_1.MostActive.deleteMany({}).exec();
        });
    }
}
exports.MostActiveRepository = MostActiveRepository;
//# sourceMappingURL=mostActiveRepository.js.map