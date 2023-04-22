import { IMostActive, MostActive } from '../models/mostActive';

export interface IMostActiveRepository {
  save(data: Partial<IMostActive>): Promise<IMostActive>;
  findMostActive(limit: number): Promise<IMostActive[]>;
  clear(): Promise<void>;
}

export class MostActiveRepository implements IMostActiveRepository {
  async save(data: Partial<IMostActive>): Promise<IMostActive> {
    const mostActive = new MostActive(data);
    return await mostActive.save();
  }

  async findMostActive(limit: number): Promise<IMostActive[]> {
    return await MostActive.find().sort({ volume: -1 }).limit(limit).exec();
  }

  async clear(): Promise<void> {
    await MostActive.deleteMany({}).exec();
  }
}
