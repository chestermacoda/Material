const MaterialServices = require('../services/MaterialServices.js');




exports.get = async(req,resp)=>{
    try {
        const getmaterial = await MaterialServices.getMaterial();
        resp.status(201).json(getmaterial)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}

exports.post = async(req,resp)=>{
    try {
        const postMaterial = await MaterialServices.postMaterial(req.body);
        resp.status(201).json(postMaterial)
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}

exports.update = async(req,resp)=>{
    try {
        const {id} = req.params;
        const updateMaterial = await MaterialServices.updateMaterial(id, req.body);
        resp.status(201).json(updateMaterial);
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}

exports.delete = async(req,resp)=>{
    const {id} = req.params
    try{
        const deletes = await MaterialServices.deleteMaterial(id)
        resp.status(201).json(deletes)
    }catch(error){
        resp.status(500).json({message:error.message})
    }
}

exports.DadosId = async(req,resp)=>{
    const {id} = req.params
    try {
        const getDado = await MaterialServices.DadosId(id)
        resp.status().json(getDado)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}