const express = require('express')
const controllers = require("../controllers")
const middlewares = require("../middlewares")
const router = express.Router()

//user
router.post('/user', middlewares.jwt.verify_access_token, controllers.course.user.create_user)
router.get('/users', middlewares.jwt.verify_access_token, controllers.course.user.get_all_users)
router.get('/user/:user_id', middlewares.jwt.verify_access_token, controllers.course.user.get_user_by_id)
router.put('/user/:user_id', middlewares.jwt.verify_access_token, controllers.course.user.edit_user)
router.delete('/user/:user_id', middlewares.jwt.verify_access_token, controllers.course.user.delete_user)

module.exports = router