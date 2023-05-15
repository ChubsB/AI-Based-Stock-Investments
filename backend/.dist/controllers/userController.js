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
exports.userRouter = void 0;
const express_1 = require("express");
const userRepository_1 = require("../repository/userRepository");
const authService_1 = require("../services/authService");
const userRepository = new userRepository_1.UserRepository();
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingUser = yield userRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = yield (0, authService_1.hashPassword)(password);
        const user = yield userRepository.create({ username, email, password: hashedPassword });
        const token = (0, authService_1.generateToken)(user.id);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userRepository.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = yield (0, authService_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = (0, authService_1.generateToken)(user.id);
        res.json({ user, token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.userRouter.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const userId = (0, authService_1.verifyToken)(token);
    if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const user = yield userRepository.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}));
exports.userRouter.post('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const userId = (0, authService_1.verifyToken)(token);
    if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const user = yield userRepository.update(userId, req.body);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}));
exports.userRouter.post('/me/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const userId = (0, authService_1.verifyToken)(token);
    if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const user = yield userRepository.delete(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
}));
//# sourceMappingURL=userController.js.map