const authorizationRepository = require('./authorizationRepository')
const {convertFrom} = require('./dto/pkceRecord')
const NotFoundValidCodeException = require('./exception/NotFoundValidCodeException')
const validator = require('./validator')
const jwt = require('./utils/jwt')

const generateCode = async userAuthorizatioin => {
  const pkceRecord = convertFrom(userAuthorizatioin)
  const result = await authorizationRepository.createCode(userAuthorizatioin.clientId, pkceRecord)
  return result.code
}

const generateAccessToken = async authInformation => {
  const pkceRecord = await authorizationRepository.findByCodeAndClientId(authInformation)
  if (pkceRecord === null) {
    throw new NotFoundValidCodeException(authInformation)
  }

  validator.validateCodeVerifier(pkceRecord, authInformation)
  const tokenHistory = await jwt.create(pkceRecord)
  return await authorizationRepository.createTokenHistory(tokenHistory)
}

module.exports = {
  generateCode,
  generateAccessToken,
}
