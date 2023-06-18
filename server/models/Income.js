import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    desc: {
        type: String,
        required: true,
    }
})

const Income = mongoose.model('income', incomeSchema)

export default Income;