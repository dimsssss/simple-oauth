const {StatusCodes} = require('http-status-codes')

class DatabaseException extends Error {
  constructor(err) {
    super()
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    this.message = err.message
  }
}

module.exports = DatabaseException
