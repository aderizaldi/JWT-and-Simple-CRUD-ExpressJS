const express = require('express')
const router = express.Router()
const auth = require('./auth_route')
const admin = require('./admin_route')
const course = require('./course_route')

router.use('/auth', auth)
router.use('/admin', admin)
router.use('/', course)

module.exports = router