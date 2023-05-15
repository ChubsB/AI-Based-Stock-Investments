import { Model } from 'mongoose';
import { IPortfolio, Portfolio } from '../models/portfolio';

export type PortfolioInput = {
	userId: IPortfolio['userId'];
	name: IPortfolio['name'];
	riskLevel: IPortfolio['riskLevel'];
	stocks: IPortfolio['stocks'];
	creationDate: IPortfolio['creationDate'];
  };

export type CreatePortfolioInput = Omit<IPortfolio, '_id'>;

export class PortfolioRepository {
	private model: Model<IPortfolio>;

	constructor() {
		this.model = Portfolio;
	}

	async create(portfolioData: PortfolioInput): Promise<IPortfolio> {
		const currentDate = new Date().toISOString().split('T')[0];
		return this.model.create({ ...portfolioData, creationDate: currentDate });
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