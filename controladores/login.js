const db = require('../databases');
const sc = require ('../security');


const postlogin = async (req, res) => {

    if ((req.body.email === undefined) || (req.body.senha === undefined)){
        res.send ({msg: "Insira o email ou a senha"})
        return
    }

    const user = await db.selectUser(req.body.email)

    const is_okay = await sc.verify_okay(req.body.senha, user.senha)

    if (is_okay === false) {
        res.send ({msg: "Email ou senha inválido"})
        return
    }

    const userSemSenha = {
        "email": user.email,
        "nome": user.nome,
        "id": user.id,
        "nome_loja": user.nome_loja
    }

    const token = sc.encode(userSemSenha)

    res.send({
        "usuario": userSemSenha,
        "token": token
    })

}

module.exports = {
    postlogin
}