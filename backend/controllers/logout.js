const jwt = require('jsonwebtoken')
const logoutRouter = require('express').Router()

logoutRouter.post('/', async (request, response) => {
    response
      .cookie('userCookie', '', { expires: new Date(0) }, { httpOnly: true })
      .send('Cookie deleted')
})

module.exports = logoutRouter