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

        res.status(200).json(expenditures)
    }
    catch (e) {
        errorHandler(res, e)
    }
}
// История изменения суммарного баланса (для графика)
// module.exports.getExpsAndGainsOfPeriod = async (req, res) => {
//     try {
//         const expenditures = await Expenditure
//             .find({
//                 user: req.user.id,
//                 createdAt: {
//                     '$gte': req.query.startDay,
//                     '$lt': req.query.endDay
//                 }
//             })
//         const gains = await Gain
//             .find({
//                 user: req.user.id,
//                 createdAt: {
//                     '$gte': req.query.startDay,
//                     '$lt': req.query.endDay
//                 }
//             })
//         const all = [...gains, ...expenditures]
//
//
//     }
//     catch (e) {
//
//     }
// }