import express from 'express';
import { PriceHistoryRepository } from '../repository/priceHistoryRepository';

const priceHistoryRouter = express.Router();

priceHistoryRouter.get('/:companyName/:startDate/:endDate', async (req, res) => {
  try {
    const companyName = req.params.companyName;
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    const repository = new PriceHistoryRepository(companyName);
    const data = await repository.findWithinDateRange(startDate, endDate);
	console.log(companyName, startDate, endDate)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default priceHistoryRouter;
