require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const errHandler = require('./middleware/errHandler')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/',router)
app.use(errHandler)

module.exports = app;