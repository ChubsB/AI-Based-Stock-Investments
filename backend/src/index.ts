import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { config } from './config/config';
import mongoose from 'mongoose';
import * as logger from './services/loggingService';
import { logEndpoints } from './services/expressUtilsService';
import { userRouter } from './controllers/userController';
import portfolioRouter from './controllers/portfolioController';
import indexRouter from './controllers/indexController';
import {Company} from './models/company'
import priceHistoryRouter from './controllers/priceHistoryController';
import standingRouter from './controllers/standingController';
import { scheduleStockDataPostRequest, fetchKSE100Data, SingleFillCompany, SingleFillIndex } from './services/crons/stockDataCron';
import { populateBiggestGainers, populateBiggestLosers, populateMostActive } from './services/crons/standingPopulatingCron';
import cors from 'cors';
import { removeDuplicateRecords, removeDuplicatesFromAllCompanies } from './helpers/removeDuplicates';
import { fetchCompanyData } from './services/crons/stockPredictionCron';

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
	.then(() => {
		logger.info('Mongo connected successfully.');
		StartServer();
	})
	.catch((error: any) => logger.error(error));
mongoose.pluralize(null);
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
}

app.get('/health-check', (req: Request, res: Response) => {
	res.send('Rupi Backend, STATUS : OK');
});

app.post('/company', (req: Request, res: Response) => {
	for (let i = 0; i < req.body.length; i++) {
		Company.create(req.body[i])
		logger.info('Created: ' + req.body[i].symbol)
	  }
	res.status(201).send("Complete")
});

app.use('/users', userRouter);
app.use('/portfolios', portfolioRouter);
app.use('/price-history', priceHistoryRouter);
app.use('/index', indexRouter)
app.use('/standing', standingRouter)

app.use((req, res, next) => {
	const error = new Error('Not found');

	logger.error('' + error);

	res.status(404).json({
		message: error.message
	});
});

app.listen(config.server.port, () => {
	logger.info(`Server is running at http://localhost:${config.server.port}`)
})

// SingleFillIndex()
// SingleFillCompany()
// removeDuplicateRecords()
// removeDuplicatesFromAllCompanies()

// populateBiggestGainers()
// populateBiggestLosers()
// populateMostActive()
logEndpoints(app);

// fetchCompanyData()
