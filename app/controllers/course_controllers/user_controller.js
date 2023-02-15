const models = require('../../models')
const argon2 = require("argon2")
const {error_handler} = require("../../utils")

const create_user = error_handler(async (req, res) => {
        const user_doc = models.Course.Users({
            name : req.body.name,
            email: req.body.email,
            password: await argon2.hash(req.body.password)
        })
        await user_doc.save()
        return res.status(200).json({
            status : 'Success',
            message : 'Berhasil menambah user baru!',
        })
})

const get_all_users = error_handler(async (req, res) => {
    const data = await models.Course.Users.find({}, {'__v' : 0}).exec()
    const count_data = await models.Course.Users.count().exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data user berhasil diambil!',
        data : {
            total_data : count_data,
            data : data
        }
    })
})

const get_user_by_id = error_handler(async (req, res) => {
    const data = await models.Course.Users.findOne({_id : req.params.user_id},{'__v' : 0}).exec()
    if(!data){
        return res.status(400).json({
            status : 'Error',
            message : 'User tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data user berhasil diambil!',
        data : data
    })
})

const edit_user = error_handler(async (req, res) => {
    const old_data = await models.Course.Users.findOne({_id: req.params.user_id}).exec()
    if(!old_data){
        return res.status(400).json({
            status : "Errors",
            message : 'User tidak ditemukan!',
        })
    }
    await models.Course.Users.updateOne({_id: req.params.user_id},
        {
            name : req.body.name || old_data.name,
            email: req.body.email || old_data.email,
            password: req.body.password ? await argon2.hash(req.body.password) : old_data.password 
        }).exec()
    return res.status(200).json({
        status : 'Success',
        message : 'Data user berhasil diubah!',
    })
})

const delete_user = error_handler(async(req, res) => {
    const data = await models.Course.Users.findOneAndRemove({_id : req.params.user_id}).exec()
    if(!data){
        return res.status(400).json({
            status : "Errors",
            message : 'User tidak ditemukan!',
        })
    }
    return res.status(200).json({
        status : 'Success',
        message : 'Data user berhasil dihapus!',
    })
})

module.exports = {
    create_user,
    get_all_users,
    get_user_by_id,
    edit_user,
    delete_user,
}
    