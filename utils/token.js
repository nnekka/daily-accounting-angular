const JWT = require('jsonwebtoken')
const config = require('../utils/config')

module.exports.generateToken = (id) => {
    return JWT.sign({id}, config.SECRET, {expiresIn: '1h'})
}