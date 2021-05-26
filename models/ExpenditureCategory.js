const mongoose = require('mongoose')


const schema = new mongoose.Schema({

    name: {type: String, required: true},
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expenditure'
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