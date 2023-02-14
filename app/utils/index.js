const mongoose = require("mongoose")

function error_handler(fn) {
    return async function(req, res, next) {
        try {
            let next_called = false
            const result = await fn(req, res, (params) => {
                next_called = true
                next(params)
            })
            if (!res.headersSent && !next_called) {
                return result
            }
        } catch (e) {
            next(e)
        }
    }
}

function with_transaction(fn) {
    return async function(req, res, next) {
        let result
        await mongoose.connection.transaction(async (session) => {
            result = await fn(req, res, session)
            return result
        })

        return result
    }
}

module.exports = {
    error_handler,
    with_transaction
}