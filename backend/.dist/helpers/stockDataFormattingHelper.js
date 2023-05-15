"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateTimeToDate = void 0;
function convertDateTimeToDate(priceHistoryData) {
    return priceHistoryData.map((record) => {
        const dateOnly = new Date(record.Date_).toISOString().split('T')[0];
        return Object.assign(Object.assign({}, record), { Date_: new Date(dateOnly) });
    });
}
exports.convertDateTimeToDate = convertDateTimeToDate;
//# sourceMappingURL=stockDataFormattingHelper.js.map