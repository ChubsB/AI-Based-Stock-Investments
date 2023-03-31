import { IPriceHistory } from "../models/priceHistory";
import { LeanDocument } from "mongoose";

export function convertDateTimeToDate<T extends IPriceHistory>(priceHistoryData: T[]): T[] {
	return priceHistoryData.map((record) => {
		const dateOnly = new Date(record.Date_).toISOString().split('T')[0];
		return {
			...record,
			Date_: new Date(dateOnly),
		} as T;
	});
}