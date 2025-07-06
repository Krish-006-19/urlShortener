const express = require('express')
const staticRoute = require('./routes/staticRouter')
const { Konnect } = require('./connect')
// Konnect is a function
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')
const URL = require('./models/url')
const path = require('path')
const PORT = 3000
const app = express()

//Connect to mongoDB
Konnect('mongodb://localhost:27017/Shorturl')
//
// MiddleWares to use the data in backend
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//
// EJS Template Engine
app.set('view engine','ejs')
app.set('views', path.resolve('./views'))
//

app.use('/',staticRoute)
app.use('/user', userRoute)
app.use('/url',urlRoute)

app.listen(PORT,_=>console.log(`Server Started at ${PORT}`))