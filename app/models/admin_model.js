const mongoose = require("mongoose");

const admin_schema = new mongoose.Schema(
    {
        name: {
            type : String,
            max : 265,
            required : true,
        },
        email: {
            type : String,
            required : true,
            unique : true,
        },
        password: {
            type : String,
            required : true,
            select : false,
        },
        createdAt : Number,
        updatedAt : Number,
    },
    {
        collection:'admin',
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
)

module.exports = mongoose.model('admin', admin_schema);
