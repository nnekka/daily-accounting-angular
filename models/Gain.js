const mongoose = require('mongoose')

//доход
const schema = new mongoose.Schema({

    sum: { type: Number, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GainCategory'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
}, {
    timestamps: true
})


const Gain = mongoose.model('Gain', schema)

module.exports = Gain