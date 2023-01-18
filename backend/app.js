const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const {requestLogger, unknownEndpoint, errorHandler, tokenExtractor} = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

console.log(`connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
 .then(() => logger.info(`connected to MONGODB`))
 .catch(error => {
    logger.error('there was an error connecting to MONGODB:', {error})
   })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if(process.env.NODE_ENV == 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)

}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app

