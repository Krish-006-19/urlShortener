const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/',async (req, res)=>{
    const { userName, email, password } = req.body
    try {
    await User.create({ userName, email, password })
    } catch (error) {
        throw error
    }
    return res.render('home')
})

module.exports = router