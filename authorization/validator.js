const crypto = require('crypto')
const NotValidCodeException = require('./exception/NotValidCodeException')

const getHash = (pkceRecord, authInformation) => {
  const {codeChallengeMethod} = pkceRecord
  const {codeVerifier} = authInformation

  return crypto.createHash(codeChallengeMethod).update(codeVerifier).digest('hex')
}

const validateCodeVerifier = (pkceRecord, authInformation) => {
  const hashedCodeChallenge = getHash(pkceRecord, authInformation)
  if (hashedCodeChallenge !== pkceRecord.codeChallenge) {
    throw new NotValidCodeException(authInformation.codeVerifier)
  }
}

module.exports = {
  validateCodeVerifier,
}
