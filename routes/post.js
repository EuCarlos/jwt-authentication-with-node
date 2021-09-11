const router = require('express').Router()
const { publicPost, privatePost } = require('../db')
const checkAuth = require('../middlewares/checkAuth')

router.get('/public', (req, res) => res.send(publicPost))

router.get('/private', checkAuth ,(req, res) => res.send(privatePost))

module.exports = router