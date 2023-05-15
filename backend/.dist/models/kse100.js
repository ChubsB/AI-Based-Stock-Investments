"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KSE100 = void 0;
const mongoose_1 = require("mongoose");
const kse100Schema = new mongoose_1.Schema({
    dates_: { type: Date, required: true },
    open_value: { type: Number, required: true },
    high_value: { type: Number, required: true },
    low_value: { type: Number, required: true },
    close_value: { type: Number, required: true },
    change_value: { type: Number, required: true },
    volume_value: { type: Number, required: true },
});
exports.KSE100 = (0, mongoose_1.model)('KSE100', kse100Schema);
//# sourceMappingURL=kse100.js.map