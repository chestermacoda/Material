const PainelModels = require('../models/PainelModels');



const getPainel = async()=>{
    const getService = await PainelModels.get();
    return getService;

}




module.exports = {
    getPainel
}