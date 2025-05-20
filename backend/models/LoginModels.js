const db = require('../config/db');
const bcrypt = require('bcrypt')

const LoginModels = { 

    get: (data) => {
        const {email} = data
      
        return new Promise((resolver,rejeitar)=>{
            db.query('SELECT * FROM usuarios where email = ?',[email],(error,resultado)=>{
                if(error) return rejeitar(error)
                if(resultado[0] === 0) return rejeitar({message: "Nenhum usuario encontrado"})
                resolver(resultado[0]);
            })  
        })
    },

    post: async (data) => {
        const {nome,email,senha,nivelacesso,status} = data
        const hashsenha = await bcrypt.hash(String(senha),10)
        return new Promise((resolver, rejeitar)=>{
             
            db.query("INSERT INTO usuarios (nome,email,senha,nivelacesso,status,data_created,data_expired,data_updated_senha,data_updated_name) VALUES (?,?,?,?,?,NOW(),NOW(),NULL,NULL)",[nome,email,hashsenha,nivelacesso,status],(error,result)=>{
                if(error) throw rejeitar(error)
                resolver({message:"Registado com sucesso"},result)
            })
        })
    }


 } 


 module.exports = LoginModels;