import { KSE100, IKSE100 } from '../models/kse100'; // Import your KSE100 model and IKSE100 interface
import { Types } from 'mongoose';
import { getPriceHistoryModel } from '../models/priceHistory';
import { Company } from '../models/company';

export async function removeDuplicateRecords() {
  try {
    const duplicates = await KSE100.aggregate([
      {
        $group: {
          _id: {
            dates_: "$dates_",
            open_value: "$open_value",
            high_value: "$high_value",
            low_value: "$low_value",
            close_value: "$close_value",
            change_value: "$change_value",
            volume_value: "$volume_value",
          },
          ids: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    if (duplicates.length === 0) {
      console.log('No duplicate records found.');
      return;
    }

    for (const duplicate of duplicates) {
      // Remove the first item from the ids array, keeping one copy of the record
      duplicate.ids.shift();

      // Delete remaining duplicates
      await KSE100.deleteMany({ _id: { $in: duplicate.ids.map(Types.ObjectId) } });
    }

    console.log(`${duplicates.length} duplicate records removed.`);
  } catch (error) {
    console.error('Error removing duplicate records:', error);
  }
}

async function removeDuplicateRecordsFromCompanies(collectionName: string) {
  try {
    const Model = getPriceHistoryModel(collectionName);
    const duplicates = await Model.aggregate([
      {
        $group: {
          _id: {
            Date_: "$Date_",
            Open: "$Open",
            High: "$High",
            Low: "$Low",
            Close: "$Close",
            Change: "$Change",
            change_valueP: "$change_valueP",
            ChangeP: "$ChangeP",
            Volume: "$Volume",
          },
          ids: { $addToSet: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    if (duplicates.length === 0) {
      console.log(`No duplicate records found in collection: ${collectionName}.`);
      return;
    }

    for (const duplicate of duplicates) {
      // Remove the first item from the ids array, keeping one copy of the record
      duplicate.ids.shift();

      // Delete remaining duplicates
      await Model.deleteMany({ _id: { $in: duplicate.ids.map(Types.ObjectId) } });
    }

    console.log(`${duplicates.length} duplicate records removed from collection: ${collectionName}.`);
  } catch (error) {
    console.error(`Error removing duplicate records from collection: ${collectionName}:`, error);
  }
}

export async function removeDuplicatesFromAllCompanies() {
  try {
    const companies = await Company.find({}).exec();

    for (const company of companies) {
      await removeDuplicateRecordsFromCompanies(company.symbol);
    }
  } catch (error) {
    console.error('Error removing duplicates from all companies:', error);
  }
}
