const db = require('../databases');
const sc = require ('../security');
const loginSchemas = require('../validations/loginSchemas')



const postlogin = async (req, res) => {

    try{       
        await loginSchemas.validate(req.body)

        const user = await db.selectUser(req.body.email)
        const is_okay = await sc.verify_okay(req.body.senha, user.senha)

        if (!is_okay) {
            return res.status(400).send ({msg: "Email ou senha inválido"})          
        }

        const userSemSenha = {
            "email": user.email,
            "nome": user.nome,
            "id": user.id,
            "nome_loja": user.nome_loja
        }

        const token = sc.encode(userSemSenha)
        
        return res.status(200).send({
            "usuario": userSemSenha,
            "token": token
        })

    } catch (error){
        return res.status(500).send(error.message)
    }
}

module.exports = {
    postlogin
}