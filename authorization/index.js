const express = require('express')
const router = express.Router()
const {
  validateCodeRequest,
  validateAccessTokenRequest,
  validateRefreshTokenRequest,
} = require('./presentation/validator')
const authorizationController = require('./presentation/authorizationController')

router.post('/code', validateCodeRequest, authorizationController.getAuthorizeCode)
router.post('/token', validateAccessTokenRequest, authorizationController.getAccessToken)
router.post('/refresh', validateRefreshTokenRequest, authorizationController.refreshAccessToken)

module.exports = router
