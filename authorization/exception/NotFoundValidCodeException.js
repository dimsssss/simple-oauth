const {StatusCodes} = require('http-status-codes')

class NotFoundValidCodeException extends Error {
  constructor(authInformation) {
    super()
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    this.message = `해당 정보의 코드가 존재하지 않습니다. clientId : ${authInformation.clientId}, code : ${authInformation.code}`
  }
}

module.exports = NotFoundValidCodeException
