const jwt = require('jsonwebtoken')
const refreshRouter = require('express').Router()

refreshRouter.get('/', async (request, response) => {
    const tokenFromCookie = request.cookies?.userCookie

    if (!tokenFromCookie)
    return response.status(401).json({ error: 'Unauthorized' })
    
    const decodedToken = jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET)
    
    if (!decodedToken)
      return response.status(401).json({ error: 'Unauthorized' })

    const accessToken = jwt.sign(
      {
        username: decodedToken.username,
        id: decodedToken.id,
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '8s' }
    )

    response.json({ accessToken })
})

module.exports = refreshRouter