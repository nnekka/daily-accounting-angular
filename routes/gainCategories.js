const express = require('express')
const {
    getGainCategories,
    createCategory,
    getCategory,
    updateCategory,
    removeCategory
} = require('../controllers/gainCategories')
const {check} = require('express-validator')
const {getTokenFromRequest} = require('../middleware/auth')
const router = express.Router()

router.route('/').get(getTokenFromRequest, getGainCategories)
router.route('/:id').get(getTokenFromRequest, getCategory)
router.route('/:id').delete(getTokenFromRequest, removeCategory)
router.route('/:id').put([
    check('name', 'Введите название категории!').not().isEmpty()
    ], getTokenFromRequest, updateCategory)
router.route('/').post([
    check('name', 'Введите название категории!').not().isEmpty()
    ], getTokenFromRequest, createCategory)

module.exports = router