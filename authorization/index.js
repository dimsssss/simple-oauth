const express = require('express')
const router = express.Router()
const {validateCodeRequest, validateAccessTokenRequest} = require('./presentation/validator')
const authorizationController = require('./presentation/authorizationController')

router.post('/code', validateCodeRequest, authorizationController.getAuthorizeCode)
router.post('/token', validateAccessTokenRequest, authorizationController.getAccessToken)

module.exports = router
