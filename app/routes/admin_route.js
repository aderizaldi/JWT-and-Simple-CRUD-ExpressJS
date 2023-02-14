const express = require('express');
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();

router.get('/me', middlewares.jwt.verify_access_token, controllers.admin.me);

module.exports = router;