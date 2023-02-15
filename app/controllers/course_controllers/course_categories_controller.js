const models = require('../../models')
const {error_handler} = require("../../utils")

const create_course_category = error_handler(async (req, res) => {
        const course_category_doc = models.Course.CourseCategories({
            name : req.body.name,
        })
        await course_category_doc.save()
        return res.status(200).json({
            status : 'Success',
            message : 'Berhasil menambah course category baru!',
        })
})

const get_all_course_categories = error_handler(async (req, res) => {
    const data = await models.Course.CourseCategories.find({}, {'__v' : 0}).exec()
    const count_data = await models.Course.CourseCategories.count().exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data course categories berhasil diambil!',
        data : {
            total_data : count_data,
            data : data
        }
    })
})

const get_course_category_by_id = error_handler(async (req, res) => {
    const data = await models.Course.CourseCategories.findOne({_id : req.params.course_category_id},{'__v' : 0}).exec()
    if(!data){
        return res.status(400).json({
            status : 'Error',
            message : 'Course category tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data course category berhasil diambil!',
        data : data
    })
})

const edit_course_category = error_handler(async (req, res) => {
    const old_data = await models.Course.CourseCategories.findOne({_id: req.params.course_category_id}).exec()
    if(!old_data){
        return res.status(400).json({
            status : "Errors",
            message : 'Course category tidak ditemukan!',
        })
    }
    await models.Course.CourseCategories.updateOne({_id: req.params.course_category_id},
        {
            name : req.body.name || old_data.name,
        }).exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data course category berhasil diubah!',
    })
})

const delete_course_category = error_handler(async(req, res) => {
    const data = await models.Course.CourseCategories.findOneAndRemove({_id : req.params.course_category_id}).exec()
    if(!data){
        return res.status(400).json({
            status : "Errors",
            message : 'Course category tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data course category berhasil dihapus!',
    })
})

module.exports = {
    create_course_category,
    get_all_course_categories,
    get_course_category_by_id,
    edit_course_category,
    delete_course_category,
}
    