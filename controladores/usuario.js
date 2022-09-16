const db = require('../databases');
const userSchemas = require('../validations/userSchemas')
const sc = require('../security');


const postusuario = async (req, res) => {

    try{
       await userSchemas.validate(req.body)

        const user = await db.selectUser(req.body.email)

        console.log (user)

        if (user !== null){
            return res.status(400).send("Já existe um usuario cadastrado com esse email")          
        }

        const encrypted_passord = await sc.encrypt(req.body.senha)

        const sqlInsert = 'insert into public.usuarios (email, nome, senha, nome_loja) values ($1, $2, $3, $4)'
        const paramsInsert = [req.body.email, req.body.nome, encrypted_passord, req.body.nome_loja]
        await db.query(sqlInsert, paramsInsert)

        const userInserted = await db.selectUser(req.body.email)       
        
        res.send ({
            'email': userInserted.email,
            'nome': userInserted.nome,
            'senha': req.body.senha,
            'nome_loja': userInserted.nome_loja

        })
    }catch (error){
        return res.status(500).json(error.message)
    }
   
}
 

module.exports = {
    postusuario,
}