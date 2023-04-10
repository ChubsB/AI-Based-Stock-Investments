import express from 'express';
import { PriceHistoryRepository } from '../repository/priceHistoryRepository';
import * as logger from '../services/loggingService';

const priceHistoryRouter = express.Router();

priceHistoryRouter.get('/:companyName/:startDate/:endDate', async (req, res) => {
  try {
    const companyName = req.params.companyName;
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    const repository = new PriceHistoryRepository(companyName);
    const data = await repository.findWithinDateRange(startDate, endDate);
    logger.info('Fetching Company Price History', companyName, startDate, endDate)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default priceHistoryRouter;
