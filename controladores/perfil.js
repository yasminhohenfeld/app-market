const db = require('../databases');
const sc = require ('../security');

const getperfil = (req, res) => {
    
    if(req.headers.authorization === undefined){
        res.send ({msg: "Ô MEU SENHOR, INSIRA UM TOKEN, QUERIDO!!!!"})
        return
    }
    const user = sc.decode(req.headers.authorization)

    if (user === null){
        res.send ({msg: "Token inválido"})
        return
    }

    
    const resposta = {
        "id": user.id,
        "nome": user.nome,
        "email": user.email,
        "nome_loja": user.nome_loja
    }

    res.send (resposta)
  
}

const putperfil = async(req, res) =>{


    if ((req.body.nome === undefined) ||
        (req.body.email === undefined) ||
        (req.body.senha === undefined) ||
        (req.body.nome_loja === undefined)) {
        res.send ("Insira os campos obrigatórios, nome, email. senha e nome_loja")
        return
    } 

    const userToken = sc.decode(req.headers.authorization)
    if (userToken === null){
        res.send ("Token inválido")
        return
    }
    
    const userSelect = await db.selectUser(req.body.email)
   
    if ((userSelect !== null) && (userToken.id !== userSelect.id)){
        res.send ({msg:"Este correo electronico es de otra persona, HOMBREEE!"})
        return

    }

    await db.updateUser(req.body.nome, req.body.email, req.body.senha, req.body.nome_loja, userToken.id)
    console.log (db.updateUser)

    res.send({
        "nome": req.body.nome, 
        "email": req.body.email,
        "senha": req.body.senha,
        "nome_loja": req.body.nome_loja
    })

}



module.exports = {
    getperfil,
    putperfil
}