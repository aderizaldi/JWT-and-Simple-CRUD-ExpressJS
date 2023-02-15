const mongoose = require("mongoose");

const course_schema = new mongoose.Schema(
    {
        title: {
            type : String,
            max : 265,
            required : true,
        },
        course_category_id : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'course_category',
            required: true
        },
        createdAt : Number,
        updatedAt : Number,
    },
    {
        collection:'courses',
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
)

module.exports = mongoose.model('courses', course_schema);
