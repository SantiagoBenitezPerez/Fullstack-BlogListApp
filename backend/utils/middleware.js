const logger = require('./logger')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    logger.info("Method:", req.method)
    logger.info("Path:", req.path)
    logger.info("Body:", req.body)
    logger.info("...")
    next()
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
     request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, SECRET);
  const user = await User.findById(decodedToken.id)
  request.user = user.username
  next()
}


const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).send({error: 'expired or invalid session. You need to sign in to proceed'})
    }
  
    next(error)
  }
  
  module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
  }