const mongoose = require("mongoose");

const course_schema = new mongoose.Schema(
    {
        user_id : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users',
            required: true
        },
        course_id : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'courses',
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

module.exports = mongoose.model('user_courses', course_schema);
