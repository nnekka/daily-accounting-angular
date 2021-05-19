const JWT = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../utils/config')

module.exports.getTokenFromRequest = async(req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer ')){
        try {
            const token = req.headers.authorization.substring(7)
            const decodedToken = JWT.verify(token, config.SECRET)
            req.user = await User.findById(decodedToken.id).select('-password')
            next()
        }
        catch (e) {
            res.status(401).json({
                errors: [{ msg: 'Невалидный токен в заголовках' }]
            })
        }
    } else {
        res.status(401).json({
            errors: [{ msg: 'В заголовках нет токена' }]
        })
    }
}