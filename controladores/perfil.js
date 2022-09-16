const db = require('../databases');
const sc = require ('../security');
const profileSchemas = require('../validations/profileSchemas')

const getperfil = async (req, res) => {

    try {   

    if(req.headers.authorization === undefined){
        return res.status(400).send ({msg: "Insira um token para continuar!"})      
    }

    const user = sc.decode(req.headers.authorization)

    if (user === null){
        return res.status(400).send ({msg: "Token inválido"})
    }
    
    const resposta = {
        "id": user.id,
        "nome": user.nome,
        "email": user.email,
        "nome_loja": user.nome_loja
    }
    return res.send (resposta)

    }catch (error){
        return res.status(500).send(error.message)
    } 
  
}

const putperfil = async(req, res) =>{
    try {

        await profileSchemas.validate(req.body)

        const userToken = sc.decode(req.headers.authorization)
        if (userToken === null){
            res.send ("Token inválido")
            return
        }
        
        const userSelect = await db.selectUser(req.body.email)
    
        if ((userSelect !== null) && (userToken.id !== userSelect.id)){
            res.status(400).send ({msg:"Este correo electronico es de otra persona!"})
            return

        }

        await db.updateUser(req.body.nome, req.body.email, req.body.senha, req.body.nome_loja, userToken.id)
        console.log (db.updateUser)

        res.status(200).send({
            "nome": req.body.nome, 
            "email": req.body.email,
            "senha": req.body.senha,
            "nome_loja": req.body.nome_loja
        })
    } catch (error){
        return res.status(500).json(error.message)
    }
}



module.exports = {
    getperfil,
    putperfil
}