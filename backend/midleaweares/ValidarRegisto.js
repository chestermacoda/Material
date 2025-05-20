const { body } = require('express-validator')
const validarInputs = require('./TratarErros')

const ValidarCampos = [

    body('nome')
        .notEmpty().withMessage('O Preencha o campo nome e Obrigatorio')
        .isString().withMessage('O nome deve ser uma string'),

    body('email')
        .notEmpty().withMessage('O Preencha o campo email e Obrigatorio')
        .isString().withMessage('O email deve ser uma string'),

    body('senha')
        .notEmpty().withMessage('O Preencha o campo senha e Obrigatorio'),

        validarInputs
];



module.exports = ValidarCampos