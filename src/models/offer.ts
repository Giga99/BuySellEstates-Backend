import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let Offer = new Schema(
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
        reviewedByAgent: {
            type: Boolean,
            default: false,
            required: true
        },
        acceptedByAgent: {
            type: Boolean,
            default: false,
            required: true
        }
    }
)

export default mongoose.model('Offer', Offer, 'offers');