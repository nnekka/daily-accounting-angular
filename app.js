const express = require('express')
const colors = require('colors')
const { connectToMongo } = require('./utils/connectDB')
const middleware = require('./middleware/errorMiddleware')
const cors = require('cors')
const userRoutes = require('./routes/auth')
const accountsRoutes = require('./routes/accounts')
const currencyRoutes = require('./routes/currency')

const app = express()

connectToMongo()

app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/currency', currencyRoutes)

app.get('https://currate.ru/api/?get=currency_list&key=b92dcd27b0382bbcd56ecb7520f3847f', (req, res) => {
    res.send(req)
})

app.use(middleware.errorHandlerGlobal)

module.exports = app