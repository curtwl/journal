const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const helper = require('../utils/helper')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = helper.requireToken(request, response)
  
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' })
    }
    const deletedUser = await User.findByIdAndRemove(request.params.id)

    response.status(204).end()
    return { success: true, message: 'Your account has been successfully deleted' }
})

module.exports = usersRouter