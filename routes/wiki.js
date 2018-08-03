const express = require('express')
const router = express.Router()
const { Page } = require('../models')

const wikiPage = require('../views/wikipage')
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
    const page = await Page.create(req.body)
    await page.save()
    res.redirect(`/wiki/${page.slug}`)
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

router.get('/:slug', async (req, res, next) => {
    try {
    const page = await Page.findOne({
        where: {slug: req.params.slug}
    })
    console.log('PAGE: ' + page)
    res.send(wikiPage(page));
} catch (error) {next(error)}
});

module.exports = router
