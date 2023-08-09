const entriesRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const helper = require('../utils/helper')

entriesRouter.get('/', async (request, response) => { 
    const token = request.headers.authorization?.split(' ')[1]

    if (token) {
      let decodedToken = null
       try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
       } catch (error) {
        response
          .status(401).json(({ error: 'Expired token' }))
       }
      if (decodedToken?.id) {
        const entries = await Entry.find({author: decodedToken.id})
        response.json(entries)
      }
    } else {
      helper.showPublicEntries(request, response)
    }
})

entriesRouter.get('/:id', async (request, response) => {
  const decodedToken = helper.requireToken(request, response)
  const entry = await Entry.findById(request.params.id)

  if (entry.author.toString() === decodedToken.id) {
    response.json(entry)
  } else {
      response.status(404).end()
  }
})

entriesRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.headers.authorization?.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  const entry = new Entry({
    title: body.title,
    content: body.content,
    author: user.id
  })

  savedEntry = await entry.save()
  user.entries = user.entries.concat(savedEntry._id)
  await user.save()
  response.status(201).json(savedEntry)
})

entriesRouter.delete('/:id', async (request, response) => {
    const decodedToken = helper.requireToken(request, response)

    // check if decodedToken.id === id of entry's author?
    await Entry.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

entriesRouter.put('/:id', async (request, response) => {
  const decodedToken = helper.requireToken(request, response)
  const body = request.body

  const entry = {
    title: body.title,
    content: body.content,
  }

  // should be before the if
  updatedEntry = await Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
  
  if (updatedEntry.author.toString() === decodedToken.id) {
    response.json(updatedEntry)
  } else {
    console.log('hack attempt?')
  }
})

module.exports = entriesRouter