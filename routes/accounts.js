const express = require('express')
const {
    getUserAccounts,
    getAccount,
    createAccount,
    updateAccountsName,
    updateAccountsTotal,
    deleteAccount
} = require('../controllers/accounts')
const {check} = require('express-validator')
const {getTokenFromRequest} = require('../middleware/auth')
const router = express.Router()

router.route('/').get(getTokenFromRequest, getUserAccounts)

router.route('/')
    .post([ check('name', 'Укажите название счета!').not().isEmpty(),
            check('currency', 'Укажите валюту').not().isEmpty()],
        getTokenFromRequest,
        createAccount
    )

router.route('/:id/name')
    .put([check('name', 'Укажите название счета!').not().isEmpty()],
        getTokenFromRequest,
        updateAccountsName
    )
router.route('/:id/total')
    .put([check('total', 'Укажите как изменилась сумма на счету').not().isEmpty()],
        getTokenFromRequest,
        updateAccountsTotal
    )
router.route('/:id').delete(getTokenFromRequest, deleteAccount)
router.route('/:id').get(getTokenFromRequest, getAccount)

module.exports = router