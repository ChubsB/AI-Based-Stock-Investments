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
exports.addUserToCollection = void 0;
const user_1 = __importDefault(require("../models/user"));
function addUserToCollection(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = req.body;
        let usr = new user_1.default(payload);
        usr.save().catch((err) => res.send(err));
        res.status(200).send();
    });
}
exports.addUserToCollection = addUserToCollection;
//# sourceMappingURL=user_controller.js.map