const mongoose = require("mongoose");

const admin_schema = new mongoose.Schema(
    {
        nama: {
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
        collection:'Admin',
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
)

module.exports = mongoose.model('Admin', admin_schema);
