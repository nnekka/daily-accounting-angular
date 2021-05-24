const express = require('express')
const {
    getExpCategories,
    createExpCategory,
    getExpCategoryById,
    updateExpCategory,
    removeExpCategory
} = require('../controllers/expenditures')
const {check} = require('express-validator')
const {getTokenFromRequest} = require('../middleware/auth')
const router = express.Router()

router.route('/').get(getTokenFromRequest, getExpCategories)
router.route('/:id').get(getTokenFromRequest, getExpCategoryById)
router.route('/:id').put([
        check('name', 'Введите название категории').not().isEmpty()
    ], getTokenFromRequest, updateExpCategory)
router.route('/:id').delete(getTokenFromRequest, removeExpCategory)
router.route('/').post([
    check('name', 'Введите название категории').not().isEmpty()
], getTokenFromRequest, createExpCategory)

module.exports = router