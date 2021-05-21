const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const schema = new mongoose.Schema({

    name: { type: String, required: true },
    currency: { type: String, required: true },
    total: { type: Number, default: 0 },
    lastDayTotal: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Account = mongoose.model('Account', schema)

module.exports = Account