import { Request, Response, Router } from 'express';
import { PortfolioRepository } from '../repository/portfolioRepository';
import { verifyToken } from '../services/authService';

const portfolioRepository = new PortfolioRepository();

export const portfolioRouter = Router();

portfolioRouter.post('/', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const userId = verifyToken(token);
  if (!userId) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { name, riskLevel, stocks } = req.body;

  const portfolio = await portfolioRepository.create({ userId, name, riskLevel, stocks });

  res.status(201).json(portfolio);
});

portfolioRouter.get('/', async (req: Request, res: Response) => {
	const token = req.headers.authorization?.split(' ')[1];
  
	if (!token) {
	  return res.status(401).json({ message: 'No token provided' });
	}
  
	const userId = verifyToken(token);
	if (!userId) {
	  return res.status(401).json({ message: 'Invalid token' });
	}
  
	const portfolios = await portfolioRepository.findByUserId(userId);
  
	res.json(portfolios);
  });