import { IBiggestGainer, BiggestGainer } from '../models/biggestGainers';

export interface IBiggestGainerRepository {
  save(data: Partial<IBiggestGainer>): Promise<IBiggestGainer>;
  findTopGainers(limit: number): Promise<IBiggestGainer[]>;
  clear(): Promise<void>;
}

export class BiggestGainerRepository implements IBiggestGainerRepository {
  async save(data: Partial<IBiggestGainer>): Promise<IBiggestGainer> {
    const biggestGainer = new BiggestGainer(data);
    return await biggestGainer.save();
  }

  async findTopGainers(limit: number): Promise<IBiggestGainer[]> {
    return await BiggestGainer.find().sort({ priceChangeP: -1 }).limit(limit).exec();
  }

  async clear(): Promise<void> {
    await BiggestGainer.deleteMany({}).exec();
  }
}