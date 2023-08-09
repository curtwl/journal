const jwt = require('jsonwebtoken')
const Entry = require('../models/entry')

const requireToken = (request, response) => {
    const token = request.headers.authorization?.split(' ')[1]
    let decodedToken = null
  
    try {
      return decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
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

module.exports = {
    requireToken,
    showPublicEntries
  }