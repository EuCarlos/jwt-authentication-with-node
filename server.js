const express = require('express')
const auth =  require('./routes/auth')
const post = require('./routes/post')
require('dotenv').config()

const port = process.env.PORT || 3333

const app = express()

app.use(express.json())
app.use('/auth', auth)
app.use('/post', post)

app.get('/', (req, res) => {
    res.send("Testando rota")
})

app.listen(port, () => {
    console.log(`🔥 Server is running in PORT ${port}`)
})