import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let Thread = new Schema(
    {
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
        active: {
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
    }
)

export default mongoose.model('Thread', Thread, 'threads');