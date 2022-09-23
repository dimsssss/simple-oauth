const authorizationRepository = require('./authorizationRepository')
const {convertFrom} = require('./dto/pkceRecord')
const generateCode = async userAuthorizatioin => {
  const pkceRecord = convertFrom(userAuthorizatioin)
  const result = await authorizationRepository.createCode(
    userAuthorizatioin.clientId,
    pkceRecord,
  )
  return result.code
}

module.exports = {
  generateCode,
}
