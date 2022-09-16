const yup = require('./yupSettings')

const userSchemas = yup.object().shape({
    email: yup.string().required(),
    senha: yup.string().required(),
    nome: yup.string().required(),
    nome_loja: yup.string().required(),
})

module.exports = userSchemas
