import express from 'express';
import { BiggestGainerRepository } from '../repository/biggestGainersRepository';
import { BiggestLoserRepository } from '../repository/biggestLosersRepository';
import { MostActiveRepository } from '../repository/mostActiveRepository';

const standingRouter = express.Router();
const gainerRepository  = new BiggestGainerRepository();
const loserRepository = new BiggestLoserRepository();
const activeRepository = new MostActiveRepository();

standingRouter.get('/top-gainers', async (req, res) => {
  try {
    const limit = 10;
    const topGainers = await gainerRepository .findTopGainers(limit);
    res.json(topGainers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top gainers', error });
  }
});

standingRouter.get('/top-losers', async (req, res) => {
  try {
    const limit = 10;
    const topLosers = await loserRepository.findTopLosers(limit);
    res.json(topLosers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top losers', error });
  }
});

standingRouter.get('/most-active', async (req, res) => {
  try {
    const limit = 10;
    const mostActive = await activeRepository.findMostActive(limit);
    res.json(mostActive);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching most active stocks', error });
  }
});

export default standingRouter;