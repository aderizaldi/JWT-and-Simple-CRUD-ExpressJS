const {error_handler} = require("../../utils");
const Validator = require("validatorjs")
const models = require("../../models")

Validator.useLang('id')

Validator.registerAsync('email_available', function(email, attribute, req, passes) {
    // do your database/api checks here etc
    // then call the `passes` method where appropriate:
    models.Admin.findOne({email: email})
    .then((result)=>{
        if(result){
            passes(false, "Email sudah terdaftar!")
            return
        }
        passes();
    })
});

const validate_signup = error_handler(async (req, res, next) => {
    let rules = {
        name: 'required|max:256',
        email: 'required|email|email_available',
        password: 'min:4'
    }

    let validator = new Validator(req.body, rules)

    validator.checkAsync(() => {
        next()
    }, () => {
        return res.status(401).json({
            status : 'Error',
            message : 'Proses validasi gagal!!',
            errors : validator.errors.all(),
        })
    })
});

const validate_login =  error_handler(async (req, res, next) => {
    let rules = {
        email: 'required|email',
        password: 'min:4'
    }

    let validator = new Validator(req.body, rules)
    if(validator.fails()){
        return res.status(401).json({
            status : 'Error',
            message : 'Proses validasi gagal!!',
            errors : validator.errors.all(),
        })
    }
    next()
})

module.exports = {
    validate_signup,
    validate_login,
};