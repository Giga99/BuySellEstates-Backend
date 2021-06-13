"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Offer = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    estateId: {
        type: Number,
        required: true
    },
    estateOwner: {
        type: String,
        required: true
    },
    bidder: {
        type: String,
        required: true
    },
    dateFrom: {
        type: String
    },
    dateTo: {
        type: String
    },
    reviewedByOwner: {
        type: Boolean,
        default: false,
        required: true
    },
    acceptedByOwner: {
        type: Boolean,
        default: false,
        required: true
    },
});
exports.default = mongoose_1.default.model('Offer', Offer, 'offers');
//# sourceMappingURL=offer.js.map