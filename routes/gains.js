const express = require('express')
const {
    getGains,
    getGainById,
    createGain,
    updateGain,
    removeGain
} = require('../controllers/gains')
const {check} = require('express-validator')
const {getTokenFromRequest} = require('../middleware/auth')
const router = express.Router()

router.route('/').get(getTokenFromRequest, getGains)
router.route('/').post([
    check('sum', 'Введите сумму дохода!').not().isEmpty()
    ], getTokenFromRequest, createGain)
router.route('/:id').get(getTokenFromRequest, getGainById)
router.route('/:id').put([
    check('sum', 'Введите сумму дохода!').not().isEmpty()
], getTokenFromRequest, updateGain)
router.route('/:id').delete(getTokenFromRequest, removeGain)


module.exports = router