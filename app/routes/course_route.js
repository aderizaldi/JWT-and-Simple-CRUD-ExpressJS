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

//course category
router.post('/course_category', middlewares.jwt.verify_access_token, controllers.course.course_category.create_course_category)
router.get('/course_categories', middlewares.jwt.verify_access_token, controllers.course.course_category.get_all_course_categories)
router.get('/course_category/:course_category_id', middlewares.jwt.verify_access_token, controllers.course.course_category.get_course_category_by_id)
router.put('/course_category/:course_category_id', middlewares.jwt.verify_access_token, controllers.course.course_category.edit_course_category)
router.delete('/course_category/:course_category_id', middlewares.jwt.verify_access_token, controllers.course.course_category.delete_course_category)

//course
router.post('/course', middlewares.jwt.verify_access_token, controllers.course.course.create_course)
router.get('/courses', middlewares.jwt.verify_access_token, controllers.course.course.get_all_courses)
router.get('/course/:course_id', middlewares.jwt.verify_access_token, controllers.course.course.get_course_by_id)
router.put('/course/:course_id', middlewares.jwt.verify_access_token, controllers.course.course.edit_course)
router.delete('/course/:course_id', middlewares.jwt.verify_access_token, controllers.course.course.delete_course)

module.exports = router