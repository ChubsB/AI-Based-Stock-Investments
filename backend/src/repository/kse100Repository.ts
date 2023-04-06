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
      });
      return data;
    } catch (error) {
      console.error('Error fetching KSE100 data within date range:', error);
      throw error;
    }
  }
}