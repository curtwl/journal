const entriesRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//const { getAccessToken } = require('./refresh')

const requireToken = (request, response) => {
  const token = request.cookies.userCookie
  let decodedToken = null

  try {
    return decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return response.status(403).json({ error: 'Invalid credentials' })
  }
}

const showPublicEntries = async (request, response) => {
  try {
    const entries = await Entry.find({public: true})
    response.json(entries)
  } catch (error) {
    response.status(500).json({ error: 'An error occurred while fetching public entries' })
  }
}

entriesRouter.get('/', async (request, response) => { 
    const token = request.headers.authorization?.split(' ')[1]
    console.log(token, 'token from entries.js')
    console.log(request.headers, 'headers from entries.js')
    if (token) {
      let decodedToken = null
       try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken, 'dectok')
       } catch (error) {
        // TODO: refesh token
        console.log(error, "catch jwt expired")
        response
          .status(401).json(({ error: 'Expired token' }))
        //.cookie('userCookie', '', { expires: new Date(0) }, { httpOnly: true })
        // .clearCookie('userCookie', { httpOnly: true })
          //showPublicEntries(request, response)
       }
      if (decodedToken?.id) {
        const entries = await Entry.find({author: decodedToken.id})
        response.json(entries)
      }
    } else {
      showPublicEntries(request, response)
    }
})

entriesRouter.get('/:id', async (request, response) => {
  const decodedToken = requireToken(request, response)

  const entry = await Entry.findById(request.params.id)

  if (entry.author.toString() === decodedToken.id) {
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
  response.status(201).json(savedEntry)
})

entriesRouter.delete('/:id', async (request, response) => {
    const decodedToken = requireToken(request, response)

    await Entry.findByIdAndRemove(decodedToken.id)
    response.status(204).end()
})

entriesRouter.put('/:id', async (request, response) => {
  const decodedToken = requireToken(request, response)
  const body = request.body

  const entry = {
    title: body.title,
    content: body.content,
  }

  updatedEntry = await Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
  console.log(updatedEntry.author.toString() === decodedToken.id)
  if (updatedEntry.author.toString() === decodedToken.id) {
    response.json(updatedEntry)
  } else {
    console.log('hack attempt?')
  }
})

module.exports = entriesRouter