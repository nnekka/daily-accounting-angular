const mongoose = require('mongoose')


const schema = new mongoose.Schema({

    name: {type: String, required: true},
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gain'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const GainCategory = mongoose.model('GainCategory', schema)

module.exports = GainCategory