import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true,
        index: true,
        maxLength: 17
    },
    uuid: {
        unique: true,
        type: String,
        required: true,
        maxLength: 36
    },
    isOriginal: {
        type: Boolean,
        default: false
    },
    isFloodgate: {
        type: Boolean,
        default: false
    },
    stats: {
        transaction: {
            money: {
                type: Number,
                default: 0
            }
            // TODO -> History of transactions
            // Referring to another table
        },
        gameInfo: {
            wins: {
                type: Number,
                default: 0
            },
            losses: {
                type: Number,
                default: 0
            },
            kills: {
                type: Number,
                default: 0
            },
            deaths: {
                type: Number,
                default: 0
            },
            // TODO -> Match History
            // Referring to another table
        }
    }
}, {
    timestamps: true,
})

const User = mongoose.model('user', UserSchema);
module.exports = User;