import { Model } from 'mongoose';
import { IPortfolio, Portfolio } from '../models/portfolioModel';

interface CreatePortfolioInput {
	userId: string;
	name: string;
	riskLevel: 'High' | 'Medium' | 'Low' | 'None';
	stocks: { symbol: string; quantity: number }[];
  }

export class PortfolioRepository {
	private model: Model<IPortfolio>;

	constructor() {
		this.model = Portfolio;
	}

	async create(portfolioData: Omit<IPortfolio, '_id'>): Promise<IPortfolio> {
		return this.model.create(portfolioData);
	}

	async findById(id: string): Promise<IPortfolio | null> {
		return this.model.findById(id);
	}

	async findByUserId(userId: string): Promise<IPortfolio[]> {
		return this.model.find({ userId });
	}

	async update(id: string, portfolioData: Partial<IPortfolio>): Promise<IPortfolio | null> {
		return this.model.findByIdAndUpdate(id, portfolioData, { new: true });
	}

	async delete(id: string): Promise<IPortfolio | null> {
		return this.model.findByIdAndRemove(id);
	}
}