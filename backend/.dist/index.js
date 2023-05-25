"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config/config");
const mongoose_1 = __importDefault(require("mongoose"));
const logger = __importStar(require("./services/loggingService"));
const expressUtilsService_1 = require("./services/expressUtilsService");
const userController_1 = require("./controllers/userController");
const portfolioController_1 = __importDefault(require("./controllers/portfolioController"));
const indexController_1 = __importDefault(require("./controllers/indexController"));
const company_1 = require("./models/company");
const priceHistoryController_1 = __importDefault(require("./controllers/priceHistoryController"));
const standingController_1 = __importDefault(require("./controllers/standingController"));
const companyController_1 = __importDefault(require("./controllers/companyController"));
const cors_1 = __importDefault(require("cors"));
const predictedPriceController_1 = __importDefault(require("./controllers/predictedPriceController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    logger.info('Mongo connected successfully.');
    StartServer();
})
    .catch((error) => logger.error(error));
mongoose_1.default.pluralize(null);
const StartServer = () => {
    app.use((req, res, next) => {
        logger.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            logger.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
};
app.get('/health-check', (req, res) => {
    res.send('Rupi Backend, STATUS : OK');
});
app.post('/company', (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        company_1.Company.create(req.body[i]);
        logger.info('Created: ' + req.body[i].symbol);
    }
    res.status(201).send("Complete");
});
app.use('/users', userController_1.userRouter);
app.use('/portfolios', portfolioController_1.default);
app.use('/price-history', priceHistoryController_1.default);
app.use('/index', indexController_1.default);
app.use('/standing', standingController_1.default);
app.use('/company', companyController_1.default);
app.use('/predicted-price', predictedPriceController_1.default);
app.use((req, res, next) => {
    const error = new Error('Not found');
    logger.error('' + error);
    res.status(404).json({
        message: error.message
    });
});
app.listen(config_1.config.server.port, () => {
    logger.info(`Server is running at http://localhost:${config_1.config.server.port}`);
});
// SingleFillIndex()
// SingleFillCompany()
// removeDuplicateRecords()
// removeDuplicatesFromAllCompanies()
// populateBiggestGainers()
// populateBiggestLosers()
// populateMostActive()
(0, expressUtilsService_1.logEndpoints)(app);
// fetchCompanyData()
//# sourceMappingURL=index.js.map