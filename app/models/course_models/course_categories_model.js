const mongoose = require("mongoose");

const course_category_schema = new mongoose.Schema(
    {
        name: {
            type : String,
            max : 265,
            required : true,
        },
        createdAt : Number,
        updatedAt : Number,
    },
    {
        collection:'course_categories',
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
)

module.exports = mongoose.model('course_categories', course_category_schema);
