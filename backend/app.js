const express =  require('express');
const cors = require('cors')
const PORT = process.env.PORT || 3000
const dotenv = require("dotenv")
const LoginRouter = require("./routes/LoginRouter.js")
const Painel = require('./routes/PainelRoutes.js')

const autenticacao = require('./midleaweares/Autenticacao.js')
const app = express();
app.use(cors());

// configuracoes
dotenv.config();
app.use(express.json())
 
// rotas 

// pagina admin index

// app.use("/",Painel)
app.use("/", LoginRouter)
app.use("/admin",autenticacao,Painel)


// Inicio do servidor 
app.listen(PORT, ()=>{
    console.log("Executado com sucesso");
})