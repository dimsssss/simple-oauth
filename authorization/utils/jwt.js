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

const createPayload = () => {
  return {
    iss: '발급 DNS',
    aud: '발급자',
  }
}

const create = pkceRecord => {
  try {
    const payload = createPayload()
    const accessToken = jsonwebtoken.sign(payload, String(pkceRecord.clientId), {expiresIn: '1h'})
    return {accessToken, tokenType: 'jwt-accessToken'}
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

module.exports = {create, isValid}
