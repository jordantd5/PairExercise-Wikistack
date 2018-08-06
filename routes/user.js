const express = require('express')
const router = express.Router()

const models = require('../models');
const Page = models.Page;
const User = models.Users;
const userList = require('../views/userList')
const userPages = require('../views/userPages')

//users
router.get('/', async (res,req,next) =>{
    try {
        const users = await User.findAll();
        res.send(userList(users));
    } catch (error) {
        next(error)
    }
})

//users/:id
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        const pages = await Page.findAll({
            where: {
                authorId: req.params.userId
            }
        });
        res.send(userPages(user, pages));
    } catch (error) {
        next(error);
    }
})

module.exports = router
