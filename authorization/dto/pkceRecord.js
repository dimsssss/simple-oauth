/* global process */
require('dotenv').config()

const convertFrom = pkceCode => {
  return {
    clientId: pkceCode.clientId,
    codeChallenge: pkceCode.codeChallenge,
    codeChallengeMethod: pkceCode.codeChallengeMethod,
  }
}

const createTokenHistory = clientId => {
  const jwt = require('../utils/jwt')
  const payload = {
    iss: '발급 DNS',
    aud: '발급자',
    clientId,
  }
  const accessToken = jwt.generateJWT(payload, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: '1h',
  })
  const refreshToken = jwt.generateJWT(payload, String(process.env.REFRESH_TOKEN_SECRET), {
    expiresIn: '7d',
  })

  return {accessToken, refreshToken, clientId}
}

const convertFromToken = token => {
  const jwt = require('../utils/jwt')
  const payload = jwt.isValid(token, process.env.REFRESH_TOKEN_SECRET)
  const data = {
    iss: '발급 DNS',
    aud: '발급자',
    clientId: payload.clientId,
  }
  const accessToken = jwt.generateJWT(data, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: '1h',
  })
  const refreshToken = jwt.generateJWT(data, String(process.env.REFRESH_TOKEN_SECRET), {
    expiresIn: '7d',
  })

  return {accessToken, refreshToken, clientId: payload.clientId}
}

const convertToRefreshTokenResponse = record => {
  return {
    accessToken: record.accessToken,
    refreshToken: record.refreshToken,
  }
}

module.exports = {
  convertFrom,
  createTokenHistory,
  convertFromToken,
  convertToRefreshTokenResponse,
}
