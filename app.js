const express = require('express')
const colors = require('colors')
const { connectToMongo } = require('./utils/connectDB')
const middleware = require('./middleware/errorMiddleware')
const cors = require('cors')
const userRoutes = require('./routes/auth')
const accountsRoutes = require('./routes/accounts')
const currencyRoutes = require('./routes/currency')
const expenditureCategoriesRoutes = require('./routes/expenditureCategories')
const expendituresRoutes = require('./routes/expenditures')
const gainCategoriesRoutes = require('./routes/gainCategories')
const gainsRoutes = require('./routes/gains')
const overviewRoutes = require('./routes/overviews')

const app = express()

connectToMongo()

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/currency', currencyRoutes)
app.use('/api/expCategories', expenditureCategoriesRoutes)
app.use('/api/expenditures', expendituresRoutes)
app.use('/api/gainCategories', gainCategoriesRoutes)
app.use('/api/gains', gainsRoutes)
app.use('/api/overviews', overviewRoutes)


app.use(middleware.errorHandlerGlobal)

module.exports = app