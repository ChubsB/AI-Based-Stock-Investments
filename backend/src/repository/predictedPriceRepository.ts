import { IPredictedPrice, getPredictedPriceModel } from '../models/predictedPrice';

export interface IPredictedPriceRepository {
  insertMany(data: IPredictedPrice[]): Promise<IPredictedPrice[]>;
}

export class PredictedPriceRepository implements IPredictedPriceRepository {
  private collectionName: string;

  constructor(companyName: string) {
    this.collectionName = companyName;
  }

  async insertMany(data: IPredictedPrice[]): Promise<IPredictedPrice[]> {
    const Model = getPredictedPriceModel(this.collectionName);
    return await Model.insertMany(data);
  }
}