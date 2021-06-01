const GainCategory = require('../models/GainCategory')
const Gain = require('../models/Gain')
const User = require('../models/User')
const Account = require('../models/Account')
const Expenditure = require('../models/Expenditure')
const ExpenditureCategory = require('../models/ExpenditureCategory')
const {errorHandler, error404Message} = require('../utils/errorHandler')


//доходы за период по всем счетам (для диаграммы)
module.exports.getGainsOfPeriod = async (req, res) => {

    try {
        const gains = await Gain
            .find({
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')

        res.status(200).json(gains)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

//доходы за период по определенному счету
module.exports.getGainsOfPeriodOfOneAccount = async (req, res) => {

    try {
        const gains = await Gain
            .find({
                account: req.params.accountId,
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')

        res.status(200).json(gains)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

//расходы за период по всем счетам (для диаграммы)
module.exports.getExpendituresOfPeriod = async (req, res) => {

    try {
        const expenditures = await Expenditure
            .find({
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')

        res.status(200).json(expenditures)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

//расходы за период по одному счету (для диаграммы)
module.exports.getExpendituresOfPeriodOfOneAccount = async (req, res) => {

    try {
        const expenditures = await Expenditure
            .find({
                account: req.params.accountId,
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')

        res.status(200).json(expenditures)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

// доходы и расходы за период по всем счетам (и общая сумма доходов и расходов)
module.exports.getGainsAndExpsOfPeriod = async (req, res) => {

    try {
        const gains = await Gain
            .find({
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')
        const exps = await Expenditure
            .find({
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')

        const gainsSummary = gains.reduce((total, curr) => total + curr.sum, 0)
        const expsSummary = exps.reduce((total, curr) => total + curr.itemPrice, 0)

        res.status(200).json({
            gains: gains, totalGains: gainsSummary,
            exps: exps, totalExps: expsSummary
        })
    }
    catch (e) {
        errorHandler(res, e)
    }
}

// доходы и расходы за период по одному счету (и общая сумма доходов и расходов)
module.exports.getGainsAndExpsOfPeriodOfAccount = async (req, res) => {

    try {
        const gains = await Gain
            .find({
                account: req.params.accountId,
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')
        const exps = await Expenditure
            .find({
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
            .populate('category')

        const gainsSummary = gains.reduce((total, curr) => total + curr.sum, 0)
        const expsSummary = exps.reduce((total, curr) => total + curr.itemPrice, 0)

        res.status(200).json({
            gains: gains, totalGains: gainsSummary,
            exps: exps, totalExps: expsSummary
        })
    }
    catch (e) {
        errorHandler(res, e)
    }
}

//История изменения суммарного баланса (для графика)
module.exports.getLastAccountsSum = async (req, res) => {
    try {
        const expenditures = await Expenditure
            .find({
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
        const gains = await Gain
            .find({
                user: req.user.id,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
        const total = [...gains, ...expenditures]
            .sort((a, b) => a.createdAt - b.createdAt)
            .map(item => {
                let element = {
                    lastAccountSum: item.lastAccountSum,
                    date: item.createdAt
                }
                return element
            })

        res.status(200).json(total)

    }
    catch (e) {
        errorHandler(res, e)
    }
}

// //История изменения  баланса одного счета(для графика)
module.exports.getLastAccountsSumById = async (req, res) => {
    try {
        const expenditures = await Expenditure
            .find({
                user: req.user.id,
                account: req.params.accountId,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
        const gains = await Gain
            .find({
                user: req.user.id,
                account: req.params.accountId,
                createdAt: {
                    '$gte': req.query.startDate,
                    '$lt': req.query.endDate
                }
            })
        const total = [...gains, ...expenditures]
            .sort((a, b) => a.createdAt - b.createdAt)
            .map(item => {
                let element = {
                    lastAccountSum: item.lastAccountSum,
                    date: item.createdAt
                }
                return element
            })

        res.status(200).json(total)

    }
    catch (e) {
        errorHandler(res, e)
    }
}

