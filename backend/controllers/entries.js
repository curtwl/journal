const entriesRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

entriesRouter.get('/', async (request, response) => { 
  const entries = await Entry.find({}).populate('author')
  response.json(entries)
})

// doesn't work in browser, works in Postman...
entriesRouter.get('/:id', async (request, response) => {
  const entry = await Entry.findById(request.params.id)
  console.log(entry.id)
  if (entry) {
    response.json(entry)
  } else {
      response.status(404).end()
  }
})

entriesRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.cookies.userCookie
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  const user = await User.findById(decodedToken.id)
  console.log(user)

  const entry = new Entry({
    title: body.title,
    content: body.content,
    author: user.id
  })

  savedEntry = await entry.save()
  user.entries = user.entries.concat(savedEntry._id)
  await user.save()
  //res.cookie("session_token", decodedToken, { expires: 60*60 })
  response.status(201).json(savedEntry)
})

entriesRouter.delete('/:id', (request, response, next) => {
  const token = request.cookies.userCookie;
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  Entry.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

entriesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const entry = {
    title: body.title,
    content: body.content,
  }

  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then(updatedEntry => {
      response.json(updatedEntry)
    })
    .catch(error => next(error))
})

module.exports = entriesRouter