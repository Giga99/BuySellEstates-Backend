"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Estate = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        auto: true
    },
    title: {
        type: String,
        required: true
    },
    ownerUsername: {
        type: String,
        required: true
    },
    municipality: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    priceToBuy: {
        type: Number,
        required: false
    },
    priceToRent: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    squareFootage: {
        type: Number,
        required: true
    },
    rentOrSale: {
        type: String,
        required: true
    },
    numberOfFloors: {
        type: Number,
        required: true
    },
    floorNumber: {
        type: Number,
        required: false
    },
    numberOfRooms: {
        type: String,
        required: false
    },
    furnished: {
        type: Boolean,
        required: true
    },
    gallery: {
        type: Array,
        required: true
    },
    promoted: {
        type: Boolean,
        required: true,
        default: false
    },
    reviewed: {
        type: Boolean,
        required: true,
        default: false
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    }
});
exports.default = mongoose_1.default.model('Estate', Estate, 'estates');
//# sourceMappingURL=estate.js.map