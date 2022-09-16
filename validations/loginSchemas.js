const yup = require('./yupSettings')

const loginSchemas = yup.object().shape({
    email: yup.string().required(),
    senha: yup.string().required(),
})

module.exports = loginSchemas