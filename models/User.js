const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now() },

})

userSchema.methods.checkPassword = async function f(password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User