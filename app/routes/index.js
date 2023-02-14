const express = require('express')
const router = express.Router()
const auth = require('./auth_route')
const admin = require('./admin_route')

router.use('/auth', auth)
router.use('/admin', admin)

module.exports = router