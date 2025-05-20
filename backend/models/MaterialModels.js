const db = require('../config/db')


 

const Material = {

    get: () => {
        return new Promise((resolver,rejeitar)=>{
            db.query('SELECT * FROM material', (error,resultado)=>{
                if(error) throw rejeitar(error)
                resolver(resultado);
            })
        })
    },
    post: (data) => {
        const {material,quantidade,tipo, Medidas,valor,status} = data
        
        return new Promise((resolver,rejeitar)=>{
            db.query("SELECT nomeMaterial from material where nomeMaterial = ?",[material],(error,resultados)=>{
                if(error) return rejeitar(error)
                if(resultados.length > 0) return resolver({message: `Material ${material} ja existe na nossa lista`})

                db.query('INSERT INTO material (nomeMaterial,quantidade,tipo,Medidas,valor,status,data_created,data_updated,data_deleted) VALUES (?,?,?,?,?,?,NOW(), NULL,NULL)',[material,quantidade,tipo, Medidas,valor,status],(error,result)=>{
                    if(error) throw rejeitar(error)
                    resolver({message: 'Material Inserido com sucesso'},result)
                })
            })
        })
    },
    update: (id,data) => {
        const {material,quantidade,tipo, Medidas,status} = data
        return new Promise((resolver,rejeitar)=>{
            db.query('UPDATE material SET nomeMaterial = ?, quantidade = ?, tipo =?, Medidas = ?, status = ?, data_updated=NOW() WHERE id = ?',[material,quantidade,tipo, Medidas,status,id],(error)=>{
                if(error) throw rejeitar(error)
                resolver({message:'Material actualizado com sucesso'})
            })
        })
    },

    delete: (id)=>{
        return new Promise((resolver,rejeitar)=>{
            db.query('DELETE FROM material where id = ?',[id],(error)=>{
                if(error) throw rejeitar(error)
                resolver({message: 'Deletado com sucesso'})
            })
        })
    },
    getDados: (id) =>{
        return new Promise((resolver,rejeitar)=>{
            db.query('SELECT * FROM material  where id = ?',[id],(error,result)=>{
                if(error) throw rejeitar(error)
                    console.log(result[0])
                resolver(result[0])
            })
        })
    }
}



module.exports = Material;