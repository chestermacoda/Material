const PainelServices = require('../services/Painelservices')



exports.get = async(req,resp)=>{
    try {
        const Painel = await PainelServices.getPainel();
        resp.status(201).json(Painel)
    } catch (error) {
        resp.status(500).json({message:error.message})
    }
}