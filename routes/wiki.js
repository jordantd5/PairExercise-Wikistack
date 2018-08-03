const express = require('express')
const router = express.Router()

const wikiPage = require('../views/wikiPage')
const addPage = require('../views/addPage')
const editPage = require('../views/editPage')

router.get('/', (res,req,next) =>{
    try {
        res.send('')
    } catch (error) {
        next(error)
    }
})

router.post('/', (res,req,next) =>{
    try {
        res.send('')
    } catch (error) {
        next(error)
    }
})

router.get('/add', (res,req,next) =>{
    try {
        res.send(addPage)
    } catch (error) {
        next(error)
    }
})

module.exports = router