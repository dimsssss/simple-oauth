const Joi = require('joi')

const codeRequestSchema = Joi.object({
  clientId: Joi.number().min(1).required(),
  grantType: Joi.string().equal('authorization_code').required(),
  redirectUrl: Joi.string().uri().required(),
  codeChallenge: Joi.string().base64().required(),
  codeChallengeMethod: Joi.string().equal('sha256').required(),
})

const validateCodeRequest = async (req, res, next) => {
  const value = await codeRequestSchema.validate(req.body)
  return next(value, req, res, next)
}

module.exports = {
  validateCodeRequest,
}
