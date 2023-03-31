import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { config } from './config/config';
import mongoose from 'mongoose';
import * as logger from './services/loggingService';
import { logEndpoints } from './services/expressUtilsService';
import { userRouter } from './controllers/userController';
import { portfolioRouter } from './controllers/portfolioController';
import {Company} from './models/companyModel'
import { schedulePostRequest } from './services/scheduledStockDataService';

dotenv.config();

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
		console.log('Created: ' + req.body[i].symbol)
	  }
	res.status(201).send("Complete")
});

app.use('/users', userRouter);
app.use('/portfolios', portfolioRouter);

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
logEndpoints(app);

