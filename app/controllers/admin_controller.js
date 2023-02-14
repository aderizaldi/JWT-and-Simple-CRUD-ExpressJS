const {error_handler} = require("../utils");
const models = require("../models");

const me = error_handler(async (req, res) => {
    const admin_doc = await models.Admin.findById(req.admin_id).exec();
    if (!admin_doc) {
        return res.status(400).json({
            status : false,
            message : 'User tidak ditemukan!'
        })
    }
    return res.status(200).json({
            status : true,
            message : 'Berhasil mendapatkan info user!',
            data : admin_doc
        })
});

module.exports = {
    me
};