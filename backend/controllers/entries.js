const entriesRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1]
  }
  return null
}

entriesRouter.get('/', async (request, response) => { 
  const entries = await Entry.find({})
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

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const entry = new Entry({
    title: body.title,
    content: body.content,
    user: user.id
  })

  savedEntry = await entry.save()
  user.entries = user.entries.concat(savedEntry._id)
  await user.save()
  response.status(201).json(savedEntry)
})

entriesRouter.delete('/:id', (request, response, next) => {
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