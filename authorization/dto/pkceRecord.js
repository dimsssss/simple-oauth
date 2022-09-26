const convertFrom = pkceCode => {
  return {
    clientId: pkceCode.clientId,
    codeChallenge: pkceCode.codeChallenge,
    codeChallengeMethod: pkceCode.codeChallengeMethod,
  }
}

module.exports = {
  convertFrom,
}
