const express = require('express')
const router = express.Router()
const db = require('../models')

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
    const form = res.json(req.body)
    const page = new Page({
      title: form.title,
      content: form.content
    })
    await page.save()
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
