import { IPriceHistory } from "../models/priceHistory";
import { LeanDocument } from "mongoose";
import { DateTime } from 'luxon'

export function convertDateTimeToDate<T extends IPriceHistory>(priceHistoryData: T[]): T[] {
	return priceHistoryData.map((record) => {
		const dateToStore = new Date(record.Date_);
		dateToStore.setDate(dateToStore.getDate() + 1);
      	dateToStore.setUTCHours(0, 0, 0, 0);
		return {
			...record,
			Date_: dateToStore,
		} as T;
	});
}