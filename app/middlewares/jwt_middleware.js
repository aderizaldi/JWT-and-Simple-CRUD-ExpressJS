const {error_handler} = require("../utils");
const jwt = require("jsonwebtoken");


const verify_access_token = error_handler(async (req, res, next) => {
    const auth_header = req.headers['authorization'];
    const token = auth_header && auth_header.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status : 'Error',
            message : 'Unauthorized!',
        })
    }

    try {
        const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user_id = decoded_token.user_id;
        next();
    } catch (err) {
        return res.status(401).json({
            status : 'Error',
            message : 'Unauthorized!',
        })
    }
});

module.exports = {
    verify_access_token
};