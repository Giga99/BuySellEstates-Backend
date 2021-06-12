import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        accepted: {
            type: Boolean,
            required: true,
            default: false
        },
        reviewed: {
            type: Boolean,
            required: true,
            default: false
        },
        userType: {
            type: String,
            required: true
        },
        agency: {
            type: String,
            required: false
        }
    }
)

export default mongoose.model('User', User, 'users');
