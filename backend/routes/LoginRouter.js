const express = require('express');
const LoginRouter = express.Router();
const LoginControllers = require('../controllers/LoginControllers.js')
const ValidarCampos = require('../midleaweares/ValidarRegisto.js')

LoginRouter.post("/login", LoginControllers.get)
LoginRouter.post("/registar", ValidarCampos,LoginControllers.post)



module.exports = LoginRouter;