import { IPredictedPrice, getPredictedPriceModel } from '../models/predictedPrice';

export interface IPredictedPriceRepository {
  insertMany(data: IPredictedPrice[]): Promise<IPredictedPrice[]>;
  findLatestDate(): Promise<Date | null>;
  findLatestPriceData(): Promise<IPredictedPrice | null>;
  findPreviousClose(date: Date): Promise<IPredictedPrice | null>;
  findWithinDateRange(startDate: Date, endDate: Date): Promise<IPredictedPrice[]>; // new method
}

export class PredictedPriceRepository implements IPredictedPriceRepository {
  private collectionName: string;

  constructor(companyName: string) {
    this.collectionName = companyName + 'Predicted';
  }

  async insertMany(data: IPredictedPrice[]): Promise<IPredictedPrice[]> {
    const Model = getPredictedPriceModel(this.collectionName);
    console.log(`'${this.collectionName}' updated`);
    return await Model.insertMany(data);
  }

  dropCollection(){
    const Model = getPredictedPriceModel(this.collectionName);
    Model.collection.drop()
    console.log(`Collection '${this.collectionName}' dropped successfully.`);
  }

  async findLatestDate(): Promise<Date | null> {
    const Model = getPredictedPriceModel(this.collectionName);
    const latestDocument = await Model.findOne().sort({ Date_: -1 }).exec();
    return latestDocument ? latestDocument.Date_ : null;
  }

  async findLatestPriceData(): Promise<IPredictedPrice | null> {
    const Model = getPredictedPriceModel(this.collectionName);
    return await Model.findOne().sort({ Date_: -1 }).exec();
  }

  async findPreviousClose(date: Date): Promise<IPredictedPrice | null> {
    const Model = getPredictedPriceModel(this.collectionName);
    return await Model.findOne({ Date_: { $lt: date } }).sort({ Date_: -1 }).exec();
  }

  async findWithinDateRange(startDate: Date, endDate: Date): Promise<IPredictedPrice[]> {
    const Model = getPredictedPriceModel(this.collectionName);
    return await Model.find({ Date_: { $gte: startDate, $lte: endDate } }).sort({ Date_: 1 }).exec();
  }
}
