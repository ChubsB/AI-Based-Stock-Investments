import express from 'express';
import { PredictedPriceRepository } from '../repository/predictedPriceRepository';
import * as logger from '../services/loggingService';

const predictedPriceRouter = express.Router();

predictedPriceRouter.get('/:companyName', async (req, res) => {
  try {
    const companyName = req.params.companyName;
    const repository = new PredictedPriceRepository(companyName);
    const data = await repository.findAll();
    logger.info('Fetching Company Predicted Price History', companyName)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default predictedPriceRouter;