const express = require('express')
const router = express.Router()
const {validateCodeRequest} = require('./validator')
const authorizationController = require('./authorizationController')

router.post(
  '/code',
  validateCodeRequest,
  authorizationController.getAuthorizeCode,
)

module.exports = router
