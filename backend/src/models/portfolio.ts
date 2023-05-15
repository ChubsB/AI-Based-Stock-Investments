import mongoose, { Document, Schema, Types} from 'mongoose';

export interface IPortfolio extends Document {
  userId: Types.ObjectId;
  name: string;
  riskLevel: 'High' | 'Medium' | 'Low' | 'None';
  stocks: { symbol: string; quantity: number }[];
  creationDate: string;
}

const PortfolioSchema = new Schema<IPortfolio>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  riskLevel: { type: String, enum: ['High', 'Medium', 'Low', 'None'], required: true },
  stocks: [
    {
      symbol: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  creationDate: { type: String, required: true },
});

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);