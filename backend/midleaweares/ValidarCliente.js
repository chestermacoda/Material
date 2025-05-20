const { body } = require('express-validator')
const validarInputs = require('./TratarErros')

const ValideCLientes = [

    body('cliente')
        .notEmpty().withMessage('O Preencha o campo nome cliente e Obrigatorio')
        .isString().withMessage('O nome deve ser uma string'),

    body('numero')
        .notEmpty().withMessage('O Preencha o campo numero e Obrigatorio')
        .isInt().withMessage('O email deve ser uma string'),

    body('bairro')
        .notEmpty().withMessage('O Preencha o campo bairro e Obrigatorio'),

        validarInputs
];



module.exports = ValideCLientes