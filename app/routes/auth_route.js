const express = require('express');
const controllers = require("../controllers");
const middlewares = require("../middlewares")
const router = express.Router();

router.post('/signup', middlewares.validation.validate_signup, controllers.auth.signup);
router.post('/login', middlewares.validation.validate_login, controllers.auth.login);
router.post('/logout', controllers.auth.logout);
router.post('/logout-all', controllers.auth.logout_all);
router.post('/access-token', controllers.auth.new_access_token);
router.post('/refresh-token', controllers.auth.new_refresh_token);

module.exports = router;