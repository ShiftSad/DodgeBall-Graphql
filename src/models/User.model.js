import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    identifier: {
        name: {
            unique: true,
            type: String,
            required: true,
            index: true,
            maxLength: 17
        },
        uuid: { // Only required of floodgate or original
            unique: true,
            type: String,
            default: null, // Should not break anything
            maxLength: 36
        },
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
            },
            // TODO -> Referring to another table
            // Transactions list
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
            // TODO -> Referring to another table
            // Games list
        }
    }
}, {
    timestamps: true,
})

const User = mongoose.model('user', UserSchema);
module.exports = User;