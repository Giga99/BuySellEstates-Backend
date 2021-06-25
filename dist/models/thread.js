"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Thread = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    estateId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    active1: {
        type: Boolean,
        default: true,
        required: true
    },
    active2: {
        type: Boolean,
        default: true,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    },
    lastMessageDate: {
        type: String
    },
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    estateOwner: {
        type: String,
        required: true
    },
    messages: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Thread', Thread, 'threads');
//# sourceMappingURL=thread.js.map