const express = require('express')
const {getCurrency} = require('../controllers/currency')
const router = express.Router()

router.route('/').get(getCurrency)

module.exports = router