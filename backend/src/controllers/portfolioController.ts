import express from 'express';
import { PortfolioRepository, PortfolioInput } from '../repository/portfolioRepository';
import { UserRepository } from '../repository/userRepository';
import * as logger from '../services/loggingService';

const portfolioRouter = express.Router();
const portfolioRepo = new PortfolioRepository();
const userRepo = new UserRepository();

portfolioRouter.post('/create', async (req, res) => {
  const { userId, name, riskLevel, stocks } = req.body;

  if (!userId || !name || !riskLevel) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await userRepo.findById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const portfolioData: PortfolioInput = { userId, name, riskLevel, stocks };
  const portfolio = await portfolioRepo.create(portfolioData);
  res.status(201).json(portfolio);
});


portfolioRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const portfolios = await portfolioRepo.findByUserId(userId);
  res.json(portfolios);
});

portfolioRouter.get('/single/:portfolioId', async (req, res) => {
  const { portfolioId } = req.params;
  const portfolio = await portfolioRepo.findById(portfolioId);
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  res.json(portfolio);
});

portfolioRouter.post('/single/:portfolioId', async (req, res) => {
  const { portfolioId } = req.params;
  const updatedData = req.body;
  const updatedPortfolio = await portfolioRepo.update(portfolioId, updatedData);

  if (!updatedPortfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  res.json(updatedPortfolio);
});

portfolioRouter.post('/:portfolioId/delete', async (req, res) => {
  const { portfolioId } = req.params;
  const deletedPortfolio = await portfolioRepo.delete(portfolioId);

  if (!deletedPortfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  res.json(deletedPortfolio);
});

export default portfolioRouter;
