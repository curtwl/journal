const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})//.populate('entries', { title: 1, content: 1 })
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

usersRouter.delete('/:id', (request, response, next) => {
    const token = request.cookies.userCookie;
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
  
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' })
    }
    User.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

module.exports = usersRouter