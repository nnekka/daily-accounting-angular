const express = require('express')
const {
    getGainsOfPeriod,
    getExpendituresOfPeriod,
    getGainsOfPeriodOfOneAccount,
    getExpendituresOfPeriodOfOneAccount,
    getGainsAndExpsOfPeriod,
    getGainsAndExpsOfPeriodOfAccount,
    getLastAccountsSum,
    getLastAccountsSumById

} = require('../controllers/overviews')
const {check} = require('express-validator')
const {getTokenFromRequest} = require('../middleware/auth')
const router = express.Router()

router.route('/gains').get(getTokenFromRequest, getGainsOfPeriod)
router.route('/expenditures').get(getTokenFromRequest, getExpendituresOfPeriod)
router.route('/expenditures/:accountId').get(getTokenFromRequest, getExpendituresOfPeriodOfOneAccount)
router.route('/gains/:accountId').get(getTokenFromRequest, getGainsOfPeriodOfOneAccount)
router.route('/gains-exps').get(getTokenFromRequest, getGainsAndExpsOfPeriod)
router.route('/gains-exps/:accountId').get(getTokenFromRequest, getGainsAndExpsOfPeriodOfAccount)
router.route('/balance').get(getTokenFromRequest, getLastAccountsSum)
router.route('/balance/:accountId').get(getTokenFromRequest, getLastAccountsSumById)


module.exports = router