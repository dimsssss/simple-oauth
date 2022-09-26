const {StatusCodes} = require('http-status-codes')
const authorizationService = require('../authorizationService')

const getAuthorizeCode = async (validator, req, res, next) => {
  try {
    if (Object.hasOwn(validator, 'error')) {
      return res.status(StatusCodes.BAD_REQUEST).send(validator.error.message)
    }
    const code = await authorizationService.generateCode(validator.value)
    return res.status(StatusCodes.CREATED).send({code})
  } catch (err) {
    return res.status(err.statusCode).send(err.message)
  }
}

const getAccessToken = async (validator, req, res, next) => {
  try {
    if (Object.hasOwn(validator, 'error')) {
      return res.status(StatusCodes.BAD_REQUEST).send(validator.error.message)
    }
    const code = await authorizationService.generateAccessToken(validator.value)
    return res.status(StatusCodes.CREATED).send({code})
  } catch (err) {
    return res.status(err.statusCode).send(err.message)
  }
}

module.exports = {
  getAuthorizeCode,
  getAccessToken,
}
