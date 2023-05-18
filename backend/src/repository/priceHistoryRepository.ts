import { IPriceHistory, getPriceHistoryModel } from '../models/priceHistory';

export interface IPriceHistoryRepository {
  insertMany(data: IPriceHistory[]): Promise<IPriceHistory[]>;
  findLatestDate(): Promise<Date | null>;
  findLatestDate(): Promise<Date | null>;
  findLatestPriceData(): Promise<IPriceHistory | null>;
  findPreviousClose(date: Date): Promise<IPriceHistory | null>;
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

  dropCollection(){
    const Model = getPriceHistoryModel(this.collectionName);
    Model.collection.drop()
    console.log(`Collection '${this.collectionName}' dropped successfully.`);
  }

  async findLatestDate(): Promise<Date | null> {
    const Model = getPriceHistoryModel(this.collectionName);
    const latestDocument = await Model.findOne().sort({ Date_: -1 }).exec();
    return latestDocument ? latestDocument.Date_ : null;
  }

  async findWithinDateRange(startDate: Date, endDate: Date): Promise<IPriceHistory[]> {
    const Model = getPriceHistoryModel(this.collectionName);
    return await Model.find({ Date_: { $gte: startDate, $lte: endDate } }).sort({ Date_: 1 }).exec();
  }  

  async findLatestPriceData(): Promise<IPriceHistory | null> {
    const Model = getPriceHistoryModel(this.collectionName);
    return await Model.findOne().sort({ Date_: -1 }).exec();
  }

  async findPreviousClose(date: Date): Promise<IPriceHistory | null> {
    const Model = getPriceHistoryModel(this.collectionName);
    return await Model.findOne({ Date_: { $lt: date } }).sort({ Date_: -1 }).exec();
  }
}