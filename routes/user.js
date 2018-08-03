const express = require('express')
const router = express.Router()

const userList = require('../views/userList')
const userPages = require('../views/userPages')

router.get('/', (res,req,next) =>{
    try {
        res.send('')
    } catch (error) {
        next(error)
    }
})

module.exports = router