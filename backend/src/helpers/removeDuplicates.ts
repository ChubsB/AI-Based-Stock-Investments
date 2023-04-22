import { KSE100, IKSE100 } from '../models/kse100'; // Import your KSE100 model and IKSE100 interface
import { Types } from 'mongoose';

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
