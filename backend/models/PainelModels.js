const db = require('../config/db');


const Painel = {

    get: () => {
        return new Promise((resolver, rejeitar) => {
            const resultados = {}

            db.query('SELECT * FROM material', (error, resultMaterial) => {
                if (error) throw rejeitar(error)
                    resultados.material = resultMaterial.length

                db.query('SELECT * FROM pedidos', (error, result) => { if (error) throw rejeitar(error)
                    resultados.pedidos = result.length
                     
                    // resolver({ "pedidos": result.length });
                })

                db.query('SELECT * FROM pedidos where status = "pendente"', (error, result) => { if (error) throw rejeitar(error)
                    resultados.pendente = result.length
                    resolver(resultados)
                  
                    // resolver({ "pedidos": result.length });
                })



                // resolver({ "material": result.length });
            })




        })
    }


}


module.exports = Painel