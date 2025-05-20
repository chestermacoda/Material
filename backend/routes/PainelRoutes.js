const express = require('express');
const PainelRouter = express.Router();
const PainelControllers = require('../controllers/PainelControllers.js');

const materialControllers = require('../controllers/materialControllers.js')
const PedidoController = require('../controllers/PedidoControllers.js')
const clienteController = require('../controllers/clienteController.js')

const ValideCliente = require('../midleaweares/ValidarCliente.js')
const ValidarMaterial = require('../midleaweares/ValidarMaterial.js')



PainelRouter.get("/", PainelControllers.get)

// Material
PainelRouter.get("/material", materialControllers.get)
PainelRouter.post("/material/adicionar", ValidarMaterial,materialControllers.post)
PainelRouter.put("/material/actualizar/:id",materialControllers.update)
PainelRouter.delete("/material/deleted/:id",materialControllers.delete)

PainelRouter.get("/material/Dados/:id",materialControllers.DadosId)

// Pedidos
PainelRouter.get("/pedidos",PedidoController.getPedido);
PainelRouter.post("/pedidos/adicionar",PedidoController.postPedido);
PainelRouter.get("/pedidos/:id", PedidoController.getpendentes);
PainelRouter.post("/pedidos/Efectuar", PedidoController.updat)
PainelRouter.put("/pedidos/Devolver/:id", PedidoController.DevolverMaterial)

PainelRouter.get("/pedidos/Detalhes/:id", PedidoController.DetalhesPedido)


// Cliente
PainelRouter.get("/cliente",clienteController.get)
PainelRouter.post("/cliente/adicionar", ValideCliente,clienteController.postControl)
 



module.exports = PainelRouter

// 878695405  - carla   