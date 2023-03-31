import mongoose, { Document, Schema } from 'mongoose';

export interface IPriceHistory extends Document {
  Date_: Date;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Change: number;
  change_valueP: number;
  ChangeP: number;
  Volume: number;
}

const PriceHistorySchema: Schema = new Schema({
  Date_: { type: Date, required: true },
  Open: { type: Number, required: true },
  High: { type: Number, required: true },
  Low: { type: Number, required: true },
  Close: { type: Number, required: true },
  Change: { type: Number, required: true },
  change_valueP: { type: Number, required: true },
  ChangeP: { type: Number, required: true },
  Volume: { type: Number, required: true },
});

export const getPriceHistoryModel = (companyName: string) => {
  return mongoose.model<IPriceHistory>(companyName, PriceHistorySchema);
};
