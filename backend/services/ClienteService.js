const ClienteModels = require('../models/ClienteModels');


const getService = async()=>{
    const gets = await ClienteModels.get();
    return gets
}
const postService = async (data)=>{
    const postSer = await ClienteModels.post(data)
    return postSer;
}


module.exports = {
    getService,
    postService
}