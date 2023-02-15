const {error_handler} = require("../../utils");
const Validator = require("validatorjs")
const models = require("../../models")

Validator.useLang('id')

Validator.registerAsync('email_available', function(email, attribute, req, passes) {
    // do your database/api checks here etc
    // then call the `passes` method where appropriate:
    models.Course.Users.findOne({email: email})
    .then((result)=>{
        if(result){
            passes(false, "Email sudah terdaftar!")
            return
        }
        passes();
    })
});

const validate_create_user = error_handler(async (req, res, next) => {
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

const validate_create_course_category =  error_handler(async (req, res, next) => {
    let rules = {
        name: 'required',
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

const validate_create_course =  error_handler(async (req, res, next) => {
    let rules = {
        title: 'required',
        course_category_id: 'required',
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

const validate_create_user_course =  error_handler(async (req, res, next) => {
    let rules = {
        user_id: 'required',
        course_id: 'required',
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
    validate_create_user,
    validate_create_course_category,
    validate_create_course,
    validate_create_user_course,
};