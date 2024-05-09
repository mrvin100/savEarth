const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

require('dotenv').config()

const {PORT, MONGODB_URI} = process.env

const app = express()

const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

console.log('connecting to', MONGODB_URI)
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI)
    .then(res => console.log('connected to mongodb'))
    .catch((error) => console.log(error.message))

app.use(express.json())
app.use(cors())
app.get('/', async (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.listen(PORT, () => console.log('server running on port', PORT))