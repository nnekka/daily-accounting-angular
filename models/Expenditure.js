const mongoose = require('mongoose')

//расход
const schema = new mongoose.Schema({

    description: { type: String, default: '' },
    itemPrice: { type: Number, required: true },
    qty: { type: Number, default: 1 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenditureCategory'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Expenditure = mongoose.model('Expenditure', schema)

module.exports = Expenditure