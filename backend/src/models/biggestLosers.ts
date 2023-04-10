import mongoose, { Document, Schema } from 'mongoose';

export interface IBiggestLoser extends Document {
  symbol: string;
  closePrice: number;
  priceChange: number;
  priceChangeP: number;
  volume: number;
}

const BiggestLoserSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  closePrice: { type: Number, required: true },
  priceChange: { type: Number, required: true },
  priceChangeP: { type: Number, required: true },
  volume: { type: Number, required: true },
});

export const BiggestLoser = mongoose.model<IBiggestLoser>('biggestlosers', BiggestLoserSchema);
