const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const refreshRouter = require('express').Router()
const User = require('../models/user')

refreshRouter.get('/', async (request, response) => {
    const tokenFromCookie = request.cookies?.userCookie
    console.log(tokenFromCookie, 'refresh cookie')
    if (!tokenFromCookie)
    return response.status(401).json({ error: 'Unauthorized' })
    
    const decodedToken = jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET)
    console.log(decodedToken, 'decodedToken')
    
    if (!decodedToken)
      return response.status(401).json({ error: 'Unauthorized' })

    const accessToken = jwt.sign(
      {
        username: decodedToken.username,
        id: decodedToken.id,
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }
    )
console.log(accessToken, 'access token from refresh.js')
    response.json({ accessToken })
})

module.exports = refreshRouter