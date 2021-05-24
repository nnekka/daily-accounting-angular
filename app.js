const express = require('express')
const colors = require('colors')
const { connectToMongo } = require('./utils/connectDB')
const middleware = require('./middleware/errorMiddleware')
const cors = require('cors')
const userRoutes = require('./routes/auth')
const accountsRoutes = require('./routes/accounts')
const currencyRoutes = require('./routes/currency')
const expenditureCategoriesRoutes = require('./routes/expenditureCategories')

const app = express()

connectToMongo()

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/currency', currencyRoutes)
app.use('/api/expCategories', expenditureCategoriesRoutes)


app.use(middleware.errorHandlerGlobal)

module.exports = app