const authorizationRepository = require('./authorizationRepository')
const dto = require('./dto/pkceRecord')

const validator = require('./validator')

const generateCode = async userAuthorizatioin => {
  const pkceRecord = dto.convertFrom(userAuthorizatioin)
  const result = await authorizationRepository.createCode(userAuthorizatioin.clientId, pkceRecord)
  return result.code
}

const generateAccessToken = async authInformation => {
  const pkceRecord = await authorizationRepository.findByCodeAndClientId(authInformation)
  const NotFoundValidCodeException = require('./exception/NotFoundValidCodeException')
  if (pkceRecord === null) {
    throw new NotFoundValidCodeException(authInformation)
  }

  validator.validateCodeVerifier(pkceRecord, authInformation)
  const tokenHistory = dto.createTokenHistory(pkceRecord.clientId)
  return await authorizationRepository.createTokenHistory(tokenHistory)
}

const refreshAccessToken = async tokenInformation => {
  const tokenHistory = await authorizationRepository.findDisabledRefeshToken(tokenInformation)
  if (tokenHistory !== null) {
    await authorizationRepository.disableAllRefreshTokenFor(tokenInformation)
    throw new Error()
  }
  const tokens = dto.convertFromToken(tokenInformation.refreshToken)
  await authorizationRepository.disableRefreshToken(tokenInformation)
  const result = await authorizationRepository.createTokenHistory(tokens)
  return dto.convertToRefreshTokenResponse(result)
}

module.exports = {
  generateCode,
  generateAccessToken,
  refreshAccessToken,
}
