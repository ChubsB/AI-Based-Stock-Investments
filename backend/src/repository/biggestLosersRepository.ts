// biggestLosersRepository.ts

import { IBiggestLoser, BiggestLoser } from '../models/biggestLosers';

export interface IBiggestLoserRepository {
  save(data: Partial<IBiggestLoser>): Promise<IBiggestLoser>;
  findTopLosers(limit: number): Promise<IBiggestLoser[]>;
  clear(): Promise<void>;
}

export class BiggestLoserRepository implements IBiggestLoserRepository {
  async save(data: Partial<IBiggestLoser>): Promise<IBiggestLoser> {
    const biggestLoser = new BiggestLoser(data);
    return await biggestLoser.save();
  }

  async findTopLosers(limit: number): Promise<IBiggestLoser[]> {
    return await BiggestLoser.find().sort({ priceChangeP: 1 }).limit(limit).exec();
  }

  async clear(): Promise<void> {
    await BiggestLoser.deleteMany({}).exec();
  }
}
