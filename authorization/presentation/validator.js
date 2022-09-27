const Joi = require('joi')

const codeRequestSchema = Joi.object({
  clientId: Joi.number().min(1).required(),
  grantType: Joi.string().equal('authorization_code').required(),
  redirectUrl: Joi.string().uri().required(),
  codeChallenge: Joi.string().required(),
  codeChallengeMethod: Joi.string().equal('sha256').required(),
})

const validateCodeRequest = async (req, res, next) => {
  const value = await codeRequestSchema.validate(req.body)
  return next(value, req, res, next)
}

const accessTokenRequestSchema = Joi.object({
  clientId: Joi.number().min(1).required(),
  grantType: Joi.string().equal('authorization_code').required(),
  redirectUrl: Joi.string().uri().required(),
  codeVerifier: Joi.string().base64().required(),
  code: Joi.string().uuid().required(),
})

const validateAccessTokenRequest = async (req, res, next) => {
  const value = await accessTokenRequestSchema.validate(req.body)
  return next(value, req, res, next)
}

const refreshTokenRequestSchema = Joi.object({
  refreshToken: Joi.string().required(),
})

const validateRefreshTokenRequest = async (req, res, next) => {
  const value = await refreshTokenRequestSchema.validate(req.body)
  return next(value, req, res, next)
}

module.exports = {
  validateCodeRequest,
  validateAccessTokenRequest,
  validateRefreshTokenRequest,
}
