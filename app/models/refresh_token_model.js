const mongoose = require('mongoose')

const refresh_token_schema = mongoose.Schema(
    {
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        createdAt : Number,
        updatedAt : Number,
    },
    {
        collection:'RefreshToken',
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
    }
)

module.exports = mongoose.model('RefreshToken', refresh_token_schema);