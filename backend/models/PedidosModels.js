const db = require('../config/db');



const Pedidos = {
    get: () => {
        return new Promise((resolver, rejeitar) => {
            db.query("SELECT cl.nomeCliente as nome,pe.id, pe.dataInicio, pe.status  FROM `pedidos` pe INNER JOIN cliente cl ON cl.id = pe.idcliente;", (error, result) => {
                if (error) throw rejeitar(error)
                resolver(result)
            })
        })
    },

    post: (data) => {
        // console.log(data)
        const { cliente, status, dataInicio, descricao } = data;

        return new Promise((resolver, rejeitar) => {

            db.query("SELECT * FROM pedidos where idcliente = ? and dataInicio = ?", [cliente, dataInicio], (error, ResulPedidosExistente) => {
                if (error) throw rejeitar(error)

                if (ResulPedidosExistente.length > 0) {
                    return resolver({ message: "Este Pedido ja foi Registado" })
                }
                
                db.query("INSERT INTO pedidos (idCliente,status,dataInicio,dataDevolucao,TotalDias,Descricao,data_created,data_updated,data_deleted) VALUES (?,?,?,NULL,NULL,?,NOW(),NULL,NULL)", [cliente, status, dataInicio, descricao], (error, result) => {
                    if (error) throw rejeitar(error)
                    resolver({ message: 'Pedido submetido com sucesso', cliente, status, dataInicio, descricao }, result)
                })
            })

            
        })
    },

    getPendent: (id) => {
        return new Promise((resolver, rejeitar) => {
            db.query("SELECT * FROM pedidos where id = ?", [id], (error, result) => {
                if (error) throw rejeitar(error)
                resolver(result[0])
            })
        })
    },

    update: (data) => {

        const { dataInicio, dataDevolucao, Quantidade, TotalDias, status, id, idMaterial } = data;


        return new Promise((resolver, rejeitar) => {

            db.query('SELECT * FROM material where id = ?', [idMaterial], (error, resul) => {
                if (error) return rejeitar(error)

                if (resul[0].quantidade <= new Number(Quantidade.valueOf())) {
                    return resolver({ message: 'Nao tem quantidade suficiente para entrega' })
                }

                const upQtty = resul[0].quantidade - new Number(Quantidade.valueOf())
                db.query('UPDATE material SET quantidade = ? where id = ?', [upQtty, idMaterial], (error) => {
                    if (error) throw rejeitar(error)

                    db.query('SELECT * FROM detalhepedidos WHERE idMaterial = ? and idPedido = ? ', [idMaterial,id], (error, verificado) => {
                        if (error) throw rejeitar(error);


                        if (verificado.length > 0) {


                            const newQuantidade = verificado[0].Quantidade + new Number(Quantidade.valueOf())
                            // console.log(newQuantidade)
                            const idDet = verificado[0].id
                            db.query('UPDATE detalhepedidos SET Quantidade = ?, dataUpdate= NOW() where id = ?', [newQuantidade, idDet], (error) => {
                                if (error) throw rejeitar(error)
                                return resolver({ message: "Actualizado com sucesso" })
                            })
                        }


                        estado = 1;
                        db.query('UPDATE pedidos SET status = ?, dataInicio = ?, dataDevolucao = ?, TotalDias = ?, data_updated = NOW() WHERE id = ?', [status, dataInicio, dataDevolucao, TotalDias, id], (error, resultss) => {

                            if (error) throw rejeitar(error);

                            // if (resultss.length > 0) {
                                db.query('INSERT INTO detalhepedidos (idMaterial,idPedido,Quantidade,status,dataCreate,dataUpdate) VALUES (?,?,?,?,NOW(),NULL)', [idMaterial, id, Quantidade, estado], (error, results) => {
                                    if (error) throw rejeitar(error);
                                    resolver({ message: "Material entregue com sucesso" }, results);
                                    // console.log("Material entregue com sucesso")
                                })
                            // }


                        })



                    })
                })



            })

        })
    },


    DevolverM: (data,id)=>{
        const {status} = data
        return new Promise((resolver,rejeitar)=>{
            db.query("UPDATE pedidos SET status = ? where id = ?", [status,id],(error,result)=>{
                if(error) return rejeitar(error)
                // resolver({message: "Devolvido com sucesso"})

                // if(result.length > 0){
                    
                db.query("SELECT * FROM detalhepedidos WHERE idPedido = ?", [id],(error,resultAll)=>{
                    if(error) return rejeitar(error)
                        // console.log(resultAll)
                        
                        resultAll.map((item)=>{
                                const idMaterial = item.idMaterial
                                // console.log(item.idMaterial)
                                db.query("SELECT * FROM material WHERE id = ? ", [idMaterial],(error,resultMat)=>{
                                    if(error) return rejeitar(error)
                                        
                                    if(resultMat.length > 0){
                                        const DevolQtyy =  new Number(item.Quantidade.valueOf())
                                        const MateriQtyy =  new Number(resultMat[0].quantidade.valueOf())
                                        const newQttys = DevolQtyy + MateriQtyy;
                                        // console.log(newQttys)
                                        db.query("UPDATE material set quantidade = ? where id = ?",[newQttys,idMaterial],(error,result)=>{
                                            if(error) return rejeitar(error)
                                            resolver({message: "Devolvido com sucesso"}) 
                                        })
                                    }
                                        
                                    
                                })

                                
                            })
                    })
                // }

            })
        })
    },

    getDetalhes: (id)=>{
        return new Promise((resolver,rejeitar)=>{
            

            db.query("SELECT PE.id,pe.idcliente,cl.nomeCliente AS nome, pe.dataInicio,pe.dataDevolucao,pe.TotalDias,pe.status,pe.Descricao,pe.TotalDias FROM `pedidos` PE INNER JOIN cliente CL ON PE.idcliente = CL.id WHERE PE.id = ?",[id],(error,result)=>{
                if(error) return rejeitar(error)
                resolver(result[0]);
            })
        })
    }


}



module.exports = Pedidos