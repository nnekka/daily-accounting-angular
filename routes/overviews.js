const express = require('express')
const {
    getGainsOfPeriod,
    getExpendituresOfPeriod,
    getGainsOfPeriodOfOneAccount,
    getExpendituresOfPeriodOfOneAccount

} = require('../controllers/overviews')
const {check} = require('express-validator')
const {getTokenFromRequest} = require('../middleware/auth')
const router = express.Router()

router.route('/gains').get(getTokenFromRequest, getGainsOfPeriod)
router.route('/expenditures').get(getTokenFromRequest, getExpendituresOfPeriod)
router.route('/expenditures/:accountId').get(getTokenFromRequest, getExpendituresOfPeriodOfOneAccount)
router.route('/gains/:accountId').get(getTokenFromRequest, getGainsOfPeriodOfOneAccount)


module.exports = router