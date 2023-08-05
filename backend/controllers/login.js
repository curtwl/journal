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

  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user._id,
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '8s' }
  )

  const refreshToken = jwt.sign(
    userForToken,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  )

  response
      .status(200)
      .cookie("userCookie", refreshToken, { httpOnly: true })
      .send({ accessToken, username: user.username, })
}

loginRouter.post('/', async (request, response) => {
  const tokenFromCookie = request.cookies.userCookie
  console.log(tokenFromCookie, 'login token')
  
  if (request.body.password)
    loginWithPassword(request, response)
  else if (tokenFromCookie) {
        const decodedToken = jwt.verify(tokenFromCookie, process.env.SECRET)
        const user = await User.findById(decodedToken.id) 
        if (user) {
          console.log('valid')
          response
            .status(200)
            .send({ tokenFromCookie, username: decodedToken.username, id: decodedToken.id })
        } else {
          console.log('clear cookie')
          response.clearCookie("token")
          response.status(401).json({ error: 'Invalid token' })
        }
  } else 
  console.log('no password or cookie')
})

module.exports = loginRouter