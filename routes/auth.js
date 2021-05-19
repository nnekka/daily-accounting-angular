const express = require('express')
const {login, getUsers, register} = require('../controllers/auth')
const {check} = require('express-validator')
const router = express.Router()

router.route('/login').post(login)
router.route('/signup').post([
    check('password', 'Пароль должен быть не менее 6 символов').isLength({min: 6}),
    check('email', 'Введите валидный email').isEmail()
], register)
router.route('/').get(getUsers)

module.exports = router