import express from 'express';
import { KSE100Repository } from '../repository/kse100Repository';

const indexRouter = express.Router();

indexRouter.get('/KSE100/:startDate/:endDate', async (req, res) => {
  try {
    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);

    const repository = new KSE100Repository();
    const data = await repository.findWithinDateRange(startDate, endDate);
    console.log(startDate, endDate);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching KSE100 data', error });
  }
});

export default indexRouter;