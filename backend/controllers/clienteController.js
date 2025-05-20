const ClienteService = require('../services/ClienteService');


exports.get = async(req,resp) =>{
    try {
        const getCliente = await ClienteService.getService();
        resp.status(201).json(getCliente);
    } catch (error) {   
        resp.status(500).json({message: error.message});
    }
}

exports.postControl = async(req,resp)=>{
    try {
        const postCliente = await ClienteService.postService(req.body)
        resp.status(201).json(postCliente);
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}