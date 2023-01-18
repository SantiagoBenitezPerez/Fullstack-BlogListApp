const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', {title:1, author:1, url:1, likes: 1})
        response.json(users)
    } catch(exception) {
        next(exception)
    }
    
})

usersRouter.post('/', async (request, response, next) => {
    const { name, username, password } = request.body

    const existingUsername = await User.findOne({username})
    if(existingUsername) return response.status(400).json({error: 'username already exists'})

    if(!(username && password)) {
        return response.status(400).json({error: 'username or password missing'})
    } else if(password.length < 3) return response.status(400).json({error: 'password length must be at least 3 characters'})


    try {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        name, 
        username, 
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

    } catch(exception) {
        next(exception)
    }

})

module.exports = usersRouter