import express from 'express';
import { PredictedPriceRepository } from '../repository/predictedPriceRepository';
import * as logger from '../services/loggingService';

const predictedPriceRouter = express.Router();

predictedPriceRouter.get('/:companyName/:startDate/:endDate', async (req, res) => {
  try {
    const companyName = req.params.companyName;
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    const repository = new PredictedPriceRepository(companyName);
    const data = await repository.findWithinDateRange(startDate, endDate);
    logger.info('Fetching Company Predicted Price History', companyName, startDate, endDate)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default predictedPriceRouter;