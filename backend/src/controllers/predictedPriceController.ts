import { PredictedPriceRepository } from '../repository/predictedPriceRepository';
import { IPredictedPrice } from '../models/predictedPrice';
exports.postPredictions = async (companyName : string, data) => {
    try {
      //Add date to data
      const repository = new PredictedPriceRepository(companyName);
      logger.info('Adding Company Predicted Price', companyName, data);
      const predPrice: IPredictedPrice[] = data;
      await repository.insertMany(predPrice);
      
    } catch (error) {
      console.log({ message: 'Error fetching data', error });
    }
  }