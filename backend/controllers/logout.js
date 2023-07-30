const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const logoutRouter = require('express').Router()
const User = require('../models/user')

logoutRouter.post('/', async (request, response) => {
    response
      .cookie('userCookie', '', { expires: new Date(0) }, { httpOnly: true })
      .send('Cookie deleted')
})

module.exports = logoutRouter