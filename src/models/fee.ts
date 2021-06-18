import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let Fee = new Schema(
    {
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
            type: String,
            required: true
        }
    }
)

export default mongoose.model('Fee', Fee, 'fees');