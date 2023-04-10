import mongoose, { Document, Schema } from 'mongoose';

export interface IMostActive extends Document {
  symbol: string;
  closePrice: number;
  priceChange: number;
  priceChangeP: number;
  volume: number;
}

const MostActiveSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  closePrice: { type: Number, required: true },
  priceChange: { type: Number, required: true },
  priceChangeP: { type: Number, required: true },
  volume: { type: Number, required: true },
});

export const MostActive = mongoose.model<IMostActive>('mostactives', MostActiveSchema);
