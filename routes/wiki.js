const express = require('express')
const router = express.Router()
const {Page} = require('../models')

const { wikiPage } = require('../views/wikiPage')
const { addPage } = require('../views/')
const { editPage } = require('../views/editPage')

router.get('/', (req, res, next) => {
  try {
    res.send('')
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    try {
        await Page.create(req.body)

        res.redirect('/')
    } catch (error) {
        next(error)
    }
})

router.get('/add', (req, res, next) => {
  try {
    res.send(addPage())
  } catch (error) {
    next(error)
  }
})

module.exports = router
