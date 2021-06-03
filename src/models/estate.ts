import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let Estate = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
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
        }
    }
)

export default mongoose.model('Estate', Estate, 'estates');