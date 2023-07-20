const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

const loginWithPassword = async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordIsCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordIsCorrect)) {
      return response.status(401).json({
      error: 'invalid username or password'
      })
  }

  const userForToken = {
      username: user.username,
      id: user._id,
  }

  const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60*60 }
  )

  response
      .status(200)
      .cookie("userCookie", token, { httpOnly: true })
      .send({ token, username: user.username, })
}

loginRouter.post('/', async (request, response) => {
  const tokenFromCookie = request.cookies.userCookie
  console.log(tokenFromCookie)
  
  if (tokenFromCookie) {
    try {
        const decodedToken = jwt.verify(tokenFromCookie, process.env.SECRET)
        if (decodedToken.id) {        
          response
            .status(200)
            .send({ tokenFromCookie, username: decodedToken.username, id: decodedToken.id })
        } else {
          response.status(401).json({ error: 'Invalid token' })
        }
    } catch {
        loginWithPassword(request, response)
    }
  } else 
    loginWithPassword(request, response)
})

module.exports = loginRouter