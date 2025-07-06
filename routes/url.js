const express = require('express')
const { nanoid } = require('nanoid')
const Url = require('../models/url')
const router = express.Router()

router.post('/',async(req, res)=>{
    const body  = req.body
    if(!body.url) return res.status(400).json({error: 'url is required!'})
const shortId = nanoid(8)
await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: []
})
return res.render('home',{id: shortId})
})

router.get('/test', async (req, res) => {
    const allUrls = await Url.find({})
    return res.end(`
        <html>
            <head></head>
            <body>
                <ol>
                    ${
                        allUrls?.map(url=>`<li>${url.shortId} - ${url.redirectUrl} - ${url.visitHistory}</li>`)
                    }
                </ol>
            </body>
        </html>
        `).join('')
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