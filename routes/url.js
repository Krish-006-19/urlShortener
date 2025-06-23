const express = require('express')
const { nanoid } = require('nanoid')
const Url = require('../models/url')
const router = express.Router()

router.post('/',async(req, res)=>{
    const { body } = req
    if(!body.url) return res.status(400).json({error: 'url is required!'})
const shortId = nanoid(8);
await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: []
})
return res.json({id: shortId})
})

router.get('/:shortId',async (req, res)=>{
    const shortId = req.params.shortId
    const entry = await Url.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    return res.redirect(entry.redirectUrl)
})

module.exports = router