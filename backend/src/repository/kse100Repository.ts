import { KSE100, IKSE100 } from '../models/kse100';

export class KSE100Repository {
  async insertMany(data: IKSE100[]): Promise<void> {
    try {
      await KSE100.insertMany(data);
    } catch (error) {
      console.error('Error inserting KSE100 data:', error);
    }
  }

  async findWithinDateRange(startDate: Date, endDate: Date): Promise<IKSE100[]> {
    try {
      const data = await KSE100.find({
        dates_: {
          $gte: startDate,
          $lte: endDate,
        },
      }).sort({dates_: 1});
      return data;
    } catch (error) {
      console.error('Error fetching KSE100 data within date range:', error);
      throw error;
    }
  }

  async findLatestDate(): Promise<Date | null> {
    const Model = KSE100;
    const latestDocument = await Model.findOne().sort({ dates_: -1 }).exec();
    return latestDocument ? latestDocument.dates_ : null;
  }
}