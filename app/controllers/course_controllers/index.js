const user = require('./user_controller')
const course_category = require('./course_categories_controller')
const course = require('./course_controller')
const user_course = require('./user_courses_controller')

module.exports = {
    user,
    course_category,
    course,
    user_course
}