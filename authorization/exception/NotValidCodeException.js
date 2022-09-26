const {StatusCodes} = require('http-status-codes')

class NotValidCodeException extends Error {
  constructor(codeVerifier) {
    super()
    this.statusCode = StatusCodes.BAD_REQUEST
    this.message = `codeVerifier가 유효하지 않습니다. ${codeVerifier}`
  }
}

module.exports = NotValidCodeException
