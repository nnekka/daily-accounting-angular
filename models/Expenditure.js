const mongoose = require('mongoose')

//расход
const schema = new mongoose.Schema({

    name: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenditureCategory'
    }
}, {
    timestamps: true
})


const Expenditure = mongoose.model('Expenditure', schema)

module.exports = Expenditure