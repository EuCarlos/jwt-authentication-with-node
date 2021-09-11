const JWT = require('jsonwebtoken')
require('dotenv').config()
const tokenJwt = process.env.MD5_HASH

module.exports = async (req, res, next) => {

    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'No token found',
                }
            ]
        })
    }

    try {
        let user = await JWT.verify(token, tokenJwt)
        req.user = user.email
        next()
    } catch (err) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Token Invalid',
                }
            ]
        })
    }
}