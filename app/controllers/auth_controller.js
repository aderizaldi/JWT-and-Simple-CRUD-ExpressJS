const jwt = require("jsonwebtoken")
const models = require("../models")
const argon2 = require("argon2")
const {error_handler, with_transaction} = require("../utils")

//controller
const signup = error_handler(with_transaction(async (req, res, session) => {
    try {
        const admin_doc = models.Admin({
            nama: req.body.nama,
            email: req.body.email,
            password: await argon2.hash(req.body.password)
        })
        const refresh_token_doc = models.RefreshToken({
            owner: admin_doc.id
        })
    
        await admin_doc.save({session})
        await refresh_token_doc.save({session})
    
        const refresh_token = create_refresh_token(admin_doc.id, refresh_token_doc.id)
        const access_token = create_access_token(admin_doc.id)
    
        return res.status(200).json({
            status : true,
            message : 'Berhasil membuat akun!',
            data : {
                id: admin_doc.id,
            access_token,
            refresh_token
            }
        })
    }
    catch(err){
        return res.status(400).json({
            status : false,
            message : 'Gagal membuat akun!',
            error : err
        })
    }
}))

const login = error_handler(with_transaction(async (req, res, session) => {
    try{
        const admin_doc = await models.Admin
            .findOne({email: req.body.email})
            .select('+password')
            .exec()       
        if (!admin_doc) {
            return res.status(401).json({
                status : false,
                message : 'Email anda tidak terdaftar!',
            })
        }

        const is_verif = await verify_password(admin_doc.password, req.body.password)
        if (!is_verif) {
            return res.status(401).json({
                status : false,
                message : 'Password yang dimasukkan salah!',
            })
        }

        const refresh_token_doc = models.RefreshToken({
            owner: admin_doc.id
        })

        await refresh_token_doc.save({session})

        const refresh_token = create_refresh_token(admin_doc.id, refresh_token_doc.id)
        const access_token = create_access_token(admin_doc.id)


        return res.status(200).json({
            status : true,
            message : 'Login berhasil!',
            data : {
                id: admin_doc.id,
                access_token,
                refresh_token
            }
        })
    }catch(err){
        return res.status(400).json({
            status : false,
            message : 'Gagal Login',
            error : err
        })
    }
}))

const new_refresh_token = error_handler(with_transaction(async (req, res, session) => {
    const current_refresh_token = await validate_refresh_token(req.body.refresh_token)
    if(!current_refresh_token){
        return res.status(401).json({
            status : false,
            message : 'Unauthorized!',
        })
    }
    const refresh_token_doc = models.RefreshToken({
        owner: current_refresh_token.admin_id
    })

    await refresh_token_doc.save({session})
    await models.RefreshToken.deleteOne({_id: current_refresh_token.token_id}, {session})

    const refresh_token = create_refresh_token(current_refresh_token.admin_id, refresh_token_doc.id)
    const access_token = create_access_token(current_refresh_token.admin_id)

    return res.status(200).json({
        status : true,
        message : 'Berhasil membuat refresh token baru!',
        data : {
            id: current_refresh_token.admin_id,
            access_token,
            refresh_token
        }
     })
}))

const new_access_token = error_handler(async (req, res) => {
    const refresh_token = await validate_refresh_token(req.body.refresh_token)
    const access_token = create_access_token(refresh_token.admin_id)

    if(!refresh_token){
        return res.status(401).json({
            status : false,
            message : 'Unauthorized!',
        })
    }

    return res.status(200).json({
        status : true,
        message : 'Berhasil membuat access token baru!',
        data : {
            id: refresh_token.admin_id,
            access_token,
            refresh_token : req.body.refresh_token
        }
     })
})

const logout = error_handler(with_transaction(async (req, res, session) => {
    const refresh_token = await validate_refresh_token(req.body.refresh_token)
    if(!refresh_token){
        return res.status(401).json({
            status : false,
            message : 'Unauthorized!',
        })
    }
    await models.RefreshToken.deleteOne({_id: refresh_token.token_id}, {session})
    return res.status(200).json({
        status : true,
        message : 'Berhasil logout!',
     })
}))

const logout_all = error_handler(with_transaction(async (req, res, session) => {
    const refresh_token = await validate_refresh_token(req.body.refresh_token)
    if(!refresh_token){
        return res.status(401).json({
            status : false,
            message : 'Unauthorized!',
        })
    }
    await models.RefreshToken.deleteMany({owner: refresh_token.admin_id}, {session})
    return res.status(200).json({
        status : true,
        message : 'Berhasil logout!',
     })
}))

//function 
function create_access_token(admin_id) {
    return jwt.sign({
        admin_id: admin_id
    }, process.env.ACCESS_TOKEN_SECRET, {
       expiresIn: '10m'
    })
}

function create_refresh_token(admin_id, refresh_token_id) {
    return jwt.sign({
        admin_id: admin_id,
        token_id: refresh_token_id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'
    })
}

async function verify_password(hashedPassword, rawPassword){
    if (await argon2.verify(hashedPassword, rawPassword)) {
        return true
    } else {
        return false
    }
}

async function validate_refresh_token(token) {
    const decode_token = () => {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        } catch(err) {
            // err
            false
        }
    }

    const decoded_token = decode_token()
    const token_exist = await models.RefreshToken.exists({_id: decoded_token.token_id, owner: decoded_token.admin_id})
    if (token_exist) {
        return decoded_token
    } else {
        return false
    }
}

module.exports = {
    signup,
    login,
    new_refresh_token,
    new_access_token,
    logout,
    logout_all
}