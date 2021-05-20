const User = require('../models/User')
const {errorHandler} = require('../utils/errorHandler')
const {generateToken} = require('../utils/token')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports.getUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}

module.exports.login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const passwordCorrect = user
            ? await bcrypt.compare(password, user.password)
            : false
        if (!user || !passwordCorrect){
            return res.status(401).json({ errors: [{ msg: 'Wrong credentials' }] })
        }
        const token = generateToken(user._id)
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: `Bearer ${token}`,
            expiresIn: 3600
        })
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const { name, email, password, avatar } = req.body

        const existUser = await User.findOne({ email })

        if(existUser){
            return res.status(400).json({
                errors: [{ msg: 'Пользователь с таким email уже существует' }]
            })
        }

        const salt = await bcrypt.genSaltSync(10)
        const passwordHash = await bcrypt.hashSync(password, salt)
        const user = new User({
            name,
            email,
            password: passwordHash,
            avatar
        })
        await user.save()
        const token = generateToken(user._id)
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: `Bearer ${token}`
        })
    }

    catch (e) {
        errorHandler(res, e)
    }
}