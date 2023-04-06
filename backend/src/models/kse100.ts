import { Schema, model, Document } from 'mongoose';

export interface IKSE100 extends Document {
  dates_: Date;
  open_value: number;
  high_value: number;
  low_value: number;
  close_value: number;
  change_value: number;
  volume_value: number;
}

const kse100Schema = new Schema({
  dates_: { type: Date, required: true },
  open_value: { type: Number, required: true },
  high_value: { type: Number, required: true },
  low_value: { type: Number, required: true },
  close_value: { type: Number, required: true },
  change_value: { type: Number, required: true },
  volume_value: { type: Number, required: true },
});

export const KSE100 = model<IKSE100>('KSE100', kse100Schema);