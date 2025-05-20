const MaterialModels = require('../models/MaterialModels.js');



const getMaterial = async()=>{
    const get = await MaterialModels.get();
    return get
}
const postMaterial = async(data)=>{
  
    const post = await MaterialModels.post(data)
    return post;
}
const updateMaterial = async(id,data)=>{
    const update = await MaterialModels.update(id,data);
    return update
}
const deleteMaterial = async (id)=>{
    const deletes = await MaterialModels.delete(id);
    return deletes
}

const DadosId = async (id)=>{
    const getDadosId = await MaterialModels.getDados(id);
    return getDadosId;
}


module.exports = {
    getMaterial,
    postMaterial,
    updateMaterial,
    deleteMaterial,
    DadosId
}