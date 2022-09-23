const {StatusCodes} = require('http-status-codes')

class NotFoundClientException extends Error {
  constructor(clientId) {
    super()
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    this.message = `존재 하지 않는 클라이언트입니다 ${clientId}`
  }
}

module.exports = NotFoundClientException
