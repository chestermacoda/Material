const LoginServices = require('../services/LoginServices')


exports.get = async(req,resp)=>{
    try {   
    
        const Login = await LoginServices.getLogin(req.body)
        resp.status(201).json(Login)
    } catch (error) {
        resp.status(500).json({error:error.message})
    }
}

exports.post = async(req,resp)=>{
    try {
        const registar = await LoginServices.postRegister(req.body)
        resp.status(201).json(registar)
    } catch (error) {
        resp.status(500).json({error:error.message})
    }
}