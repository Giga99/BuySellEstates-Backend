"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Message = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isOffer: {
        type: Boolean,
        required: true
    },
    dateFrom: {
        type: String
    },
    dateTo: {
        type: String
    },
    offerId: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Message', Message, 'messages');
//# sourceMappingURL=message.js.map