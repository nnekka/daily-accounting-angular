const GainCategory = require('../models/GainCategory')
const Gain = require('../models/Gain')
const User = require('../models/User')
const {errorHandler, error400Message, error404Message} = require('../utils/errorHandler')
const {validationResult} = require('express-validator')

module.exports.getGainCategories = async (req, res) => {
    try {
        const categories = await GainCategory.find({user: req.user.id})
        res.status(200).json(categories)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getCategory = async (req, res) => {
    try {
        const category = await GainCategory.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if (!category){
            return error404Message(res, 'Такой категории не существует')
        }
        res.status(200).json(category)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.createCategory = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id)
        const existCategory = await GainCategory.findOne({
            name: req.body.name,
            user: user._id
        })
        if (existCategory){
            return error400Message(res, 'Такая категория уже существует')
        }
        const category = new GainCategory({
            name: req.body.name,
            user: user._id
        })
        await category.save()
        res.status(201).json(category)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateCategory = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id)
        const category = await GainCategory.findOne({
            _id: req.params.id,
            user: user._id
        })
        if (!category){
            return error404Message(res, 'Такой категории не существует')
        }

        category.name = req.body.name
        await category.save()
        res.status(200).json(category)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.removeCategory = async (req, res) => {
    try {
        await GainCategory.findOneAndRemove({
            _id: req.params.id,
            user: req.user.id
        })
        await Gain.deleteMany({category: req.params.id})

        res.status(200).json({message: 'Категория удалена'})
    }

    catch (e) {
        errorHandler(res, e)
    }
}