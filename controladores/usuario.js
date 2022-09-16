const db = require('../databases');

const sc = require('../security');




const postusuario = async (req, res) => {

  
    if ((req.body.email === undefined) || (req.body.nome === undefined) || (req.body.senha === undefined) || (req.body.nome_loja === undefined)){
        res.status(400).send("Insira os campos obrigatórios")
        return
    }

    const user = await db.selectUser(req.body.email)
    if (user !== null){
        res.status(400).send("Já existe um usuario cadastrado com esse email")
        return
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
   
}
 

module.exports = {
    postusuario,
}