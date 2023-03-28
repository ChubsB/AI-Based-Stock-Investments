import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
    symbol: string;
    name: string;
    sector: string;
}

const CompanySchema: Schema = new Schema({
    symbol: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    sector: { type: String, required: true },
});

export const Company = mongoose.model<ICompany>('companies', CompanySchema);