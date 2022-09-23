const convertFrom = pkceCode => {
  return {
    codeChallenge: pkceCode.codeChallenge,
    codeChallengeMethod: pkceCode.codeChallengeMethod,
  }
}

module.exports = {
  convertFrom,
}
