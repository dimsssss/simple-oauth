const {StatusCodes} = require('http-status-codes')
const jsonwebtoken = require('jsonwebtoken')
const {JsonWebTokenError} = jsonwebtoken

class JWTException extends JsonWebTokenError {
  constructor(err) {
    super()
    this.message = err.message
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

const generateJWT = (payload, key, option) => {
  try {
    return jsonwebtoken.sign(payload, key, option)
  } catch (err) {
    throw new JWTException(err)
  }
}

const isValid = (token, key) => {
  try {
    return jsonwebtoken.verify(token, key)
  } catch (err) {
    throw new JWTException(err)
  }
}

module.exports = {generateJWT, isValid}
