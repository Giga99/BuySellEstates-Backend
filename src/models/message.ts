import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let Message = new Schema(
    {
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
    }
)

export default mongoose.model('Message', Message, 'messages');