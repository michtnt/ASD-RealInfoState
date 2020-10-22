// Log all requests that is being sent
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  // If the API endpoint doesn't exist
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  // common error will pass this and print a humanly readable error
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError'){
      return response.status(401).json({ error: 'invalid token' })
    }
    next(error)
  }

  // get token from a body object
  const tokenExtractor = (request, response, next) => {
      const authorisation = request.get('authorization')
      if(authorisation && authorisation.toLowerCase().startsWith('bearer ')){
        request.token = authorisation.substring(7);
      }
      else { request.token = null;}
      next(); //error
  } 

  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
  }