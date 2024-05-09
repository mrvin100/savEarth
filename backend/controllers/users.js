const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
    const {username, password, email} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
        username, email, password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser).status(200)
    } catch (error) {
        res.status(402).json({error: error})
    }
})

module.exports = userRouter