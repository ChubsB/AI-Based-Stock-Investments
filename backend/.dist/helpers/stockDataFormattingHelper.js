"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateTimeToDate = void 0;
function convertDateTimeToDate(priceHistoryData) {
    return priceHistoryData.map((record) => {
        const dateToStore = new Date(record.Date_);
        dateToStore.setDate(dateToStore.getDate() + 1);
        dateToStore.setUTCHours(0, 0, 0, 0);
        return Object.assign(Object.assign({}, record), { Date_: dateToStore });
    });
}
exports.convertDateTimeToDate = convertDateTimeToDate;
//# sourceMappingURL=stockDataFormattingHelper.js.map