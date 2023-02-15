const mongoose = require('mongoose')

const refresh_token_schema = mongoose.Schema(
    {
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        createdAt : Number,
        updatedAt : Number,
    },
    {
        collection:'refresh_token',
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
)

module.exports = mongoose.model('refresh_token', refresh_token_schema);