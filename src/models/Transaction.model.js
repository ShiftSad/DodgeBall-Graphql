import mongoose, {Schema} from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    amount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Transaction = mongoose.model('transaction', TransactionSchema);
module.exports = Transaction;
