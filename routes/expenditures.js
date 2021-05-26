const express = require('express')
const {
    getExpenditures,
    createExpenditure,
    updateExpenditure,
    removeExpenditure,
    getExpenditureById
} = require('../controllers/expenditures')
const {check} = require('express-validator')
const {getTokenFromRequest} = require('../middleware/auth')
const router = express.Router()

router.route('/').get(getTokenFromRequest, getExpenditures)
router.route('/').post(getTokenFromRequest, createExpenditure)
router.route('/:id').get(getTokenFromRequest, getExpenditureById)
router.route('/:id').put(getTokenFromRequest, updateExpenditure)
router.route('/:id').delete(getTokenFromRequest, removeExpenditure)

module.exports = router