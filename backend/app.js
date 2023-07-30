const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const entriesRouter = require('./controllers/entries')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const logoutRouter = require('./controllers/logout')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(cookieParser())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/entries', entriesRouter)
app.use('/api/login', loginRouter)
app.use('/api/signup', usersRouter)
app.use('/api/logout', logoutRouter)
// catch reloads from routes other than '/'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app