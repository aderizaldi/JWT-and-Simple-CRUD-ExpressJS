const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
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
        collection:'users',
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
)

module.exports = mongoose.model('users', user_schema);
