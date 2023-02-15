const models = require('../../models')
const {error_handler} = require("../../utils")

const create_course = error_handler(async (req, res) => {
        const course_doc = models.Course.Courses({
            title : req.body.title,
            course_category_id : req.body.course_category_id,
        })
        await course_doc.save()
        return res.status(200).json({
            status : 'Success',
            message : 'Berhasil menambah course baru!',
        })
})

const get_all_courses = error_handler(async (req, res) => {
    const data = await models.Course.Courses.find({}, {'__v' : 0}).populate({path : 'course_category_id', select : 'name'}).exec()
    const count_data = await models.Course.Courses.count().exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data courses berhasil diambil!',
        data : {
            total_data : count_data,
            data : data
        }
    })
})

const get_course_by_id = error_handler(async (req, res) => {
    const data = await models.Course.Courses.findOne({_id : req.params.course_id},{'__v' : 0}).populate({path : 'course_category_id', select : 'name'}).exec()
    if(!data){
        return res.status(400).json({
            status : 'Error',
            message : 'course tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data course berhasil diambil!',
        data : data
    })
})

const edit_course = error_handler(async (req, res) => {
    const old_data = await models.Course.Courses.findOne({_id: req.params.course_id}).exec()
    if(!old_data){
        return res.status(400).json({
            status : "Errors",
            message : 'course tidak ditemukan!',
        })
    }
    await models.Course.Courses.updateOne({_id: req.params.course_id},
        {
            title : req.body.title || old_data.title,
            course_category_id : req.body.course_category_id || old_data.course_category_id,
        }).exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data course berhasil diubah!',
    })
})

const delete_course = error_handler(async(req, res) => {
    const data = await models.Course.Courses.findOneAndRemove({_id : req.params.course_id}).exec()
    if(!data){
        return res.status(400).json({
            status : "Errors",
            message : 'course tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data course berhasil dihapus!',
    })
})

module.exports = {
    create_course,
    get_all_courses,
    get_course_by_id,
    edit_course,
    delete_course,
}
    