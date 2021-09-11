const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { users } = require('../db')
require('dotenv').config()
const tokenJwt = process.env.MD5_HASH

// SIGNUP
router.post('/signup', [
    check('email', 'Please input a valid email')
        .isEmail(),
    check('password', 'Please input a password with a min length of 6')
        .isLength({ min: 6 })
], async (req, res) => {
    const { name, email, password } = req.body

    // validated the input
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        })
    }

    // validate if user doesn't already exist
    let user = users.find((user) => {
        return user.email === email
    })

    if(!user) {
        return res.status(422).json({
            errors: [
                {
                    msg: 'This user already exists',
                }
            ]
        })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save the password into the database
    users.push({
        email,
        password: hashedPassword
    })

    const token = await JWT.sign({ email }, tokenJwt, { expiresIn: 360000 })

    res.json({ token })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    let user = users.find((user) => {
        return user.email === email
    })

    if(!user) {
        return res.status(422).json({
            errors: [
                {
                    msg: 'Invalid credentials',
                }
            ]
        })
    }

    let isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(422).json({
            errors: [
                {
                    msg: 'Invalid credentials',
                }
            ]
        })
    }

    const token = await JWT.sign({ email }, tokenJwt, { expiresIn: 360000 })
    res.json({ token })
})


// ALL USER
router.get('/all', (req, res) => res.json(users))

module.exports = router