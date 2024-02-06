// @ts-check
/* eslint-disable no-console */

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const requestIp = require('request-ip')

const adminRouter = require('./routers/admin')
const userRouter = require('./routers/users')
const apiRouter = require('./routers/apis')
const compareRouter = require('./routers/compare')
const carInfoRouter = require('./routers/carInfo')

const app = express()
const PORT = 5000
const corsOptions = {
  origin: '*',
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(requestIp.mw())

app.get('/api', (req, res) => {
  res.send('api server')
})
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
app.use('/api/apis', apiRouter)
app.use('/api/compare', compareRouter)
app.use('/api/carInfo', carInfoRouter)

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

app.listen(PORT, () => {
  console.log(`PORT = ${PORT}`)
})


