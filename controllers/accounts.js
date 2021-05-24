const Account = require('../models/Account')
const {errorHandler} = require('../utils/errorHandler')
const {validationResult} = require('express-validator')


module.exports.getUserAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({user: req.user.id})
        res.status(200).json(accounts)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAccount= async (req, res) => {
    try {
        const account = await Account.findById(req.params.id)
        res.status(200).json(account)
    }
    catch (e) {
        errorHandler(res, e)
    }
}


module.exports.createAccount = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const {name, currency, total} = req.body
        const existAccount = await Account.findOne({name})
        if (existAccount) {
            return res.json({errors: [{msg: 'Аккаунт с таким названием уже существует'}]})
        }
        const newAccount = new Account({
            name,
            currency,
            total,
            user: req.user.id
        })

        await newAccount.save()
        res.status(201).json({
            success: true,
            account: newAccount
        })
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateAccountsName = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const account = await Account.findById(req.params.id)
        if (!account) {
            return res.status(404).json({errors: [{msg: 'Аккаунт не найден'}]})
        }
        account.name = req.body.name
        await account.save()
        res.status(200).json({
            success: true,
            account
        })

    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateAccountsTotal = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const {total} = req.body
        const account = await Account.findById(req.params.id)
        if (!account) {
            return res.status(404).json({errors: [{msg: 'Аккаунт не найден'}]})
        }
        account.lastDayTotal = account.total
        account.total = total

        await account.save()
        res.status(200).json({
            success: true,
            account
        })

    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.deleteAccount = async (req, res) => {
    try {

        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const account = await Account.findById(req.params.id)
            if (account) {
                await Account.findByIdAndRemove(req.params.id)
                res.status(200).json({
                    success: true,
                    message: 'Аккаунт удален'
                })
            } else {
                res.status(404).json({errors: [{msg: 'Такого аккаунта не существует или он был удален'}]})
            }
        } else {
            return res.status(400).json({errors: [{msg: 'ID аккаунта невалидный'}]})
        }
    }
    catch (e) {
        errorHandler(res, e)
    }
}



