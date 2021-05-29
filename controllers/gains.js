const GainCategory = require('../models/GainCategory')
const Gain = require('../models/Gain')
const User = require('../models/User')
const Account = require('../models/Account')
const {errorHandler, error404Message} = require('../utils/errorHandler')
const {validationResult} = require('express-validator')

module.exports.getGains = async (req, res) => {
    try {
        const gains = await Gain.find({ user: req.user.id }).populate('category')
        res.status(200).json(gains)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getGainById = async (req, res) => {
    try {
        const gain = await Gain.findById(req.params.id)
        res.status(200).json(gain)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.createGain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const {sum, categoryId, accountId} = req.body
        const category = await GainCategory.findById(categoryId)
        const user = await User.findById(req.user.id)
        if (!category){
            return error404Message(res, 'Категория не найдена')
        }
        const account = await Account.findById(accountId)
        if (!account){
            return error404Message(res, 'Такого счета не существует')
        }

        const lastSumOnAccount = account.total + sum
        const newGain = new Gain({
            sum,
            category: category._id,
            account: account._id,
            user: user._id,
            lastAccountSum: lastSumOnAccount

        })
        await newGain.save()
        category.items = category.items.concat(newGain._id)
        await category.save()
        account.total = account.total + newGain.sum
        await account.save()
        res.status(201).json(newGain)
        
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateGain = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const {sum} = req.body
        const gainToUpdate = await Gain.findById(req.params.id)
        if (gainToUpdate){
            const diff = gainToUpdate.sum - sum
            gainToUpdate.sum = sum

            const account = await Account.findById(gainToUpdate.account)
            if (!account){
                return error404Message(res, 'Аккаунт не сущесвует или удален')
            }
            account.total = account.total - diff
            gainToUpdate.lastAccountSum = account.total
            await gainToUpdate.save()
            await account.save()
            res.status(200).json(gainToUpdate)
        } else {
            error404Message(res, 'Такой статьи расходов не существует :(')
        }

    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.removeGain = async (req, res) => {
    try {
        const gainToDelete = await Gain.findById(req.params.id)
        if (gainToDelete){
            const category = await GainCategory.findById(gainToDelete.category)
            if (!category){
                return error404Message(res, 'Такой категории не существует')
            }
            const account = await Account.findById(gainToDelete.account)
            if (!account){
                return error404Message(res, 'Такого счета не существует')
            }
            await Gain.findByIdAndRemove(req.params.id)
            category.items = category.items.filter(p => p._id.toString() !== req.params.id.toString())
            await category.save()
            account.total = account.total - gainToDelete.sum
            await account.save()
            res.status(200).json({ message: 'Успешно удалено'})

        } else {
            error404Message(res, 'Не найдено')
        }
    }
    catch (e) {
        errorHandler(res, e)
    }
}


