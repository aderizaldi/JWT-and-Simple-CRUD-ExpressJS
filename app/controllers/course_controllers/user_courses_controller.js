const models = require('../../models')
const {error_handler} = require("../../utils")

const create_user_course = error_handler(async (req, res) => {
        const user_course_doc = models.Course.UserCourses({
            user_id : req.body.user_id,
            course_id : req.body.course_id,
        })
        await user_course_doc.save()
        return res.status(200).json({
            status : 'Success',
            message : 'Berhasil menambah user course baru!',
        })
})

const get_all_user_courses = error_handler(async (req, res) => {
    const data = await models.Course.UserCourses.find({}, {'__v' : 0}).populate({path : 'user_id', select : 'name email'}).populate({path : 'course_id', select : 'title'}).exec()
    const count_data = await models.Course.UserCourses.count().exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data user courses berhasil diambil!',
        data : {
            total_data : count_data,
            data : data
        }
    })
})

const get_user_course_by_id = error_handler(async (req, res) => {
    const data = await models.Course.UserCourses.findOne({_id : req.params.user_course_id},{'__v' : 0}).populate({path : 'user_id', select : 'name email'}).populate({path : 'course_id', select : 'title'}).exec()
    if(!data){
        return res.status(400).json({
            status : 'Error',
            message : 'User course tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data user courses berhasil diambil!',
        data : data
    })
})

const edit_user_course = error_handler(async (req, res) => {
    const old_data = await models.Course.UserCourses.findOne({_id: req.params.user_course_id}).exec()
    if(!old_data){
        return res.status(400).json({
            status : "Errors",
            message : 'User course tidak ditemukan!',
        })
    }
    await models.Course.UserCourses.updateOne({_id: req.params.user_course_id},
        {
            user_id : req.body.user_id || old_data.user_id,
            course_id : req.body.course_id || old_data.course_id,
        }).exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data user courses berhasil diubah!',
    })
})

const delete_user_course = error_handler(async(req, res) => {
    const data = await models.Course.UserCourses.findOneAndRemove({_id : req.params.user_course_id}).exec()
    if(!data){
        return res.status(400).json({
            status : "Errors",
            message : 'User courses tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data user courses berhasil dihapus!',
    })
})

module.exports = {
    create_user_course,
    get_all_user_courses,
    get_user_course_by_id,
    edit_user_course,
    delete_user_course,
}
    