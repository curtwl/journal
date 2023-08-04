const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const refreshRouter = require('express').Router()
const User = require('../models/user')

refreshRouter.get('/', async (request, response) => {
    const tokenFromCookie = request.cookies?.userCookie
    console.log(tokenFromCookie)
    if (!tokenFromCookie)
      return res.status(401).json({ error: 'Unauthorized' })
    
    const decodedToken = jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET)
    if (!decodedToken)
      return res.status(401).json({ error: 'Unauthorized' })

    const accessToken = jwt.sign(
      {
        username: decodedToken.username,
        id: decodedToken._id,
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 20 }
    )

    response.json({ accessToken })
})

module.exports = refreshRouter