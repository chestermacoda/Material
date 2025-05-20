const { body } = require('express-validator')
const validarInputs = require('./TratarErros')

const ValidarCampos = [

    body('material')
        .notEmpty().withMessage('O Preencha o campo material e Obrigatorio')
        .isString().withMessage('O material deve ser uma string'),

    body('quantidade')
        .notEmpty().withMessage('O Preencha o campo Quantidade e Obrigatorio')
        .isInt().withMessage('A quantidade deve ser um Valor Inteiro'),
        
        body('Medidas')
        .notEmpty().withMessage('O Preencha o campo medidas e Obrigatorio'),
        
        body('valor')
        .notEmpty().withMessage('O Preencha o campo valor e Obrigatorio')
        .isInt().withMessage('o preco deve ser um Valor Inteiro'),

        validarInputs
];



module.exports = ValidarCampos