const Expenditure = require('../models/Expenditure')
const ExpenditureCategory = require('../models/ExpenditureCategory')
const User = require('../models/User')
const {errorHandler} = require('../utils/errorHandler')
const {validationResult} = require('express-validator')

//получение всех категорий расходов
module.exports.getExpCategories = async (req, res) => {
    try {
        const categories = await ExpenditureCategory.find({user: req.user.id})
        res.status(200).json(categories)
    }

    catch (e) {
        errorHandler(res, e)
    }
}

// получение одной категории расходов по id
module.exports.getExpCategoryById = async (req, res) => {
    try {
        const category = await ExpenditureCategory.findOne({
            _id: req.params.id,
            user: req.user.id
        })
        res.status(200).json(category)
    }

    catch (e) {
        errorHandler(res, e)
    }
}

// создание категории расходов
module.exports.createExpCategory = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {

        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({ errors: [{msg: 'Пользователь не найден'}] })
        }
        const existCategory = await ExpenditureCategory.findOne({name: req.body.name})
        if (existCategory){
            return res.status(400).json({ errors: [{msg: 'Такая категория уже существует'}] })
        }
        const newCategory = new ExpenditureCategory({
            name: req.body.name,
            user: user._id
        })
        await newCategory.save()
        res.status(201).json(newCategory)
    }

    catch (e) {
        errorHandler(res, e)
    }
}

// изменение названия одной категории расходов
module.exports.updateExpCategory = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const category = await ExpenditureCategory.findOne({
            _id: req.params.id,
            user: req.user.id
        })
        if (category) {
            category.name = req.body.name
            await category.save()
            res.status(200).json(category)
        } else {
            res.status(400).json({ errors: [{msg: 'Такой категории не существует'}] })
        }
    }

    catch (e) {
        errorHandler(res, e)
    }
}

// удаление категории расходов
module.exports.removeExpCategory = async (req, res) => {
    try {
        await ExpenditureCategory.findOneAndRemove({
            _id: req.params.id,
            user: req.user.id
        })
        res.status(200).json({ message: 'Категория удалена' })
    }

    catch (e) {
        errorHandler(res, e)
    }
}