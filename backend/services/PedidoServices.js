const PedidosModels = require('../models/PedidosModels');




const gets = async()=>{
    const get = await PedidosModels.get();
    return get;
}

const posts = async(data)=>{
   
    const postss = await PedidosModels.post(data);
    return postss;
}

const getPendents = async(id)=>{
    const getawait = await PedidosModels.getPendent(id);
    return getawait;
}
const updateService = async(data)=>{
    // console.log("saa")
    const updateServi = await PedidosModels.update(data);
    return updateServi;
}
const DevolverService = async(data,id)=>{

    const devolverMaterial = await PedidosModels.DevolverM(data,id)
    return devolverMaterial;
}
const DetalhesService = async(id)=>{
    const Detalhess = await PedidosModels.getDetalhes(id);
    return Detalhess;
}



module.exports ={
    gets,
    posts,
    getPendents,
    updateService,
    DevolverService,
    DetalhesService
}