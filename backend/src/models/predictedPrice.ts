import mongoose, { Document, Schema } from 'mongoose';

export interface IPredictedPrice extends Document {
  Date_: Date;
  Close: number;
}

const PredictedPriceSchema: Schema = new Schema({
  Date_: { type: Date, required: true },
  Close: { type: Number, required: true },
});

export const getPredictedPriceModel = (companyName: string) => {
  return mongoose.model<IPredictedPrice>(companyName, PredictedPriceSchema);
};