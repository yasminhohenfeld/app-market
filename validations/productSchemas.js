const yup = require('./yupSettings')

const createProductSchemas = yup.object().shape({
    nome: yup.string().required(),
    estoque: yup.number().required(),
    preco: yup.number().required(),
    descricao: yup.string().required(),
    categoria: yup.string().required(),
    imagem: yup.string().required(),
})

const updateProductSchemas = yup.object().shape({
    nome: yup.string().required(),
    estoque: yup.number().required(),
    preco: yup.number().required(),
    descricao: yup.string().required(),
    categoria: yup.string().required(),

})




module.exports = {
    createProductSchemas,
    updateProductSchemas

}

