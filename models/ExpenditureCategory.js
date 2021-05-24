const mongoose = require('mongoose')


const schema = new mongoose.Schema({

    name: { type: String, required: true },
    items: [
        {
            id: String,
            name: String,
            itemPrice: Number,
            qty: Number
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const ExpenditureCategory = mongoose.model('ExpenditureCategory', schema)

module.exports = ExpenditureCategory