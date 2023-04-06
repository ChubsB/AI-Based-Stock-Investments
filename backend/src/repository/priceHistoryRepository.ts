import { IPriceHistory, getPriceHistoryModel } from '../models/priceHistory';

export interface IPriceHistoryRepository {
  insertMany(data: IPriceHistory[]): Promise<IPriceHistory[]>;
  findLatestDate(): Promise<Date | null>;
}

export class PriceHistoryRepository implements IPriceHistoryRepository {
  private collectionName: string;

  constructor(companyName: string) {
    this.collectionName = companyName;
  }

  async insertMany(data: IPriceHistory[]): Promise<IPriceHistory[]> {
    const Model = getPriceHistoryModel(this.collectionName);
    return await Model.insertMany(data);
  }

  async findLatestDate(): Promise<Date | null> {
    const Model = getPriceHistoryModel(this.collectionName);
    const latestDocument = await Model.findOne().sort({ Date_: -1 }).exec();
    return latestDocument ? latestDocument.Date_ : null;
  }

  async findWithinDateRange(startDate: Date, endDate: Date): Promise<IPriceHistory[]> {
    const Model = getPriceHistoryModel(this.collectionName);
    return await Model.find({ Date_: { $gte: startDate, $lte: endDate } }).exec();
  }  
}