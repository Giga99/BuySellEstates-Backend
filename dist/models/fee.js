"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Fee = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    rentFee: {
        type: Number,
        required: true
    },
    saleFee: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model('Fee', Fee, 'fees');
//# sourceMappingURL=fee.js.map