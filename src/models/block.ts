import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let Block = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        blockedUsername: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model('Block', Block, 'blocks');
