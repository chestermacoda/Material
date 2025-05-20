const PedidoServices = require('../services/PedidoServices');
// const Errors = require('../midleaweares/ValidErrorControllers');

exports.getPedido = async(req,resp)=>{
    try {
        const getpedidos = await PedidoServices.gets();
        resp.status(201).json(getpedidos);
    } catch (error) {   
        resp.status(500).json({message:error.message})
    }
}

exports.postPedido = async(req,resp)=>{
    try {
        
        const postPedidos = await PedidoServices.posts(req.body)
        resp.status(201).json(postPedidos)
    } catch (error) {
       resp.status(500).json({message:error.message})
    }
}

exports.getpendentes = async(req,resp)=>{
    try {
        // console.log("hello")
        const {id} = req.params
        const getpendente = await PedidoServices.getPendents(id);
        resp.status(201).json(getpendente)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}

exports.updat = async(req,resp)=>{
    try {
        // const {idMaterial} = req.params
        const updatePedido = await PedidoServices.updateService(req.body)
        resp.status(201).json(updatePedido)
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}


exports.DevolverMaterial = async(req,resp)=>{
    try{
        
        const {id} = req.params
        const DevolverMaterial = await PedidoServices.DevolverService(req.body,id)
        resp.status(200).json(DevolverMaterial)
    }catch(error){
        resp.status(500).json({message: error.message})
    }
}

exports.DetalhesPedido = async(req,resp)=>{
    try {
        const {id} = req.params
  
        const Detalhes = await PedidoServices.DetalhesService(id);
        resp.status(200).json(Detalhes)
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
}