const db = require('../config/db');


const cliente = {

    get: () => {
        return new Promise((resolver, rejeitar) => {

            db.query('SELECT * FROM cliente', (error, result) => {
                if (error) return rejeitar(error)
                resolver(result);
            })
        })
    },

    post: (data) => {
        const { cliente, numero, bairro } = data
        return new Promise((resolver, rejeitar) => {
            db.query('SELECT * FROM cliente where nomeCliente = ?', [cliente], (error, resultClient) => {
                if (error) throw rejeitar(error)
                if (resultClient.length > 0) {
                    return resolver({message: "Cliente ja existente"})
                }
                db.query('INSERT INTO cliente (nomeCliente,numero,bairro,status,data_created,data_updated,data_deleted) VALUES (?,?,?,1,NOW(),NULL,NULL)', [cliente, numero, bairro], (error, resultado) => {
                    if (error) throw rejeitar(error)
                    resolver({ message: 'Inserido com sucesso' }, resultado)
                })
            })
            
        })
    }

}


module.exports = cliente;