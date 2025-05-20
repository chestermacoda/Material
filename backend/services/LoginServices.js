const LoginModels = require("../models/LoginModels");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const getLogin = async (data) => {
    const { senha, email } = data;

    const get = await LoginModels.get(data);

    if (!get) throw new Error('Usuário não encontrado');

    const senhaValidate = await bcrypt.compare(String(senha), get.senha);

    if (!senhaValidate) throw Error('senha invalida');

    const token = jwt.sign(
        {
            id: get.id,
            email: get.email
        },
        jwtConfig.secret,
        { expiresIn: '1h' }
    )
    // console.log('JWT Secret:', jwtConfig.secret);
    return {
        token,
        get
    };
}

const postRegister = async (data) => {
    const post = await LoginModels.post(data);
    return post
}


module.exports = {
    getLogin,
    postRegister
}