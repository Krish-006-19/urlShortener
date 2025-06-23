const express = require('express')
const PORT = 8001
const app = express()
const { Konnect } = require('./connect')
const urlRouter = require('./routes/url')

Konnect('mongodb://localhost:27017/Shorturl')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/url',urlRouter)

app.listen(PORT,_=>console.log(`Server Started at ${PORT}`))