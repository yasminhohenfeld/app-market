const db = require('../databases');
const sc = require('../security');


const postprodutos = async (req, res) => {
    if ((req.body.nome === undefined) || 
        (req.body.estoque === undefined) || 
        (req.body.preco === undefined) || 
        (req.body.descricao === undefined))
    {
        res.send ({msg: "Insira os campos obrigatórios nome, estoque, preco e descricao"})
        return
    }

    if(req.headers.authorization === undefined){
        res.send ({msg: "Ô MEU SENHOR, INSIRA UM TOKEN, QUERIDO!!!!"})
        return
    }
    const user = sc.decode(req.headers.authorization)

    if (user === null){
        res.send ({msg: "Token inválido"})
        return
    }

    let imagem = null
    if (req.body.imagem !== undefined){
        imagem = req.body.imagem
    }
    let categoria = null
    if (req.body.categoria !== undefined){
        categoria = req.body.categoria
    }
    await db.insertProduct(req.body.nome, req.body.estoque, categoria, req.body.preco, req.body.descricao, imagem, user.id)

    res.send({msg: {
        "nome": req.body.nome,
        "estoque": req.body.estoque,
        "categoria": categoria,
        "preco": req.body.preco, 
        "descricao": req.body.descricao,
        "imagem": imagem
    }})
}

const getprodutos = async (req, res) => {

    if(req.headers.authorization === undefined){
        res.send ({msg: "Ô MEU SENHOR, INSIRA UM TOKEN, QUERIDO!!!!"})
        return
    }
    const user = sc.decode(req.headers.authorization)

    if (user === null){
        res.send ({msg: "Token inválido"})
        return
    }

    let categoria = null
    if (req.query.categoria !== undefined){
        categoria = req.query.categoria
    }

   const produtos = await db.selectProducts(categoria, user.id)

    res.send(produtos)

}

const getprodutosid = async (req, res) =>{
    if(req.headers.authorization === undefined){
        res.send ({msg: "Necesitas poner un token!!!"})
        return
    }
    const user = sc.decode(req.headers.authorization)

    if (user === null){
        res.send ({msg: "Token inválido"})
        return
    }
    const produtodoUsuario = await db.selectProduct(req.params.id)

    if (produtodoUsuario === null){
        res.send ({msg: "Este producto no existe, insertar un otro id"})
        return
    }
    
    if (produtodoUsuario.usuario_id !== user.id){
        res.send ({msg: "El id de este producto no pertenece a ti. Por favor suba otro id"})
        return
    }

    res.send(produtodoUsuario)
}

const putprodutosid = async (req, res) => {
    if(req.headers.authorization === undefined){
        res.send ({msg: "Necesitas poner un token!!!"})
        return
    }
    const user = sc.decode(req.headers.authorization)

    if (user === null){
        res.send ({msg: "Token inválido"})
        return
    }
    const produtodoUsuario = await db.selectProduct(req.params.id)
    if (produtodoUsuario === null){
        res.send ({msg: "Este producto no existe, insertar un otro id"})
        return
    }
    
    if (produtodoUsuario.usuario_id !== user.id){
        res.send ({msg: "El id de este producto no pertenece a ti. Por favor suba otro id"})
        return
    }
    
    const produtoAtualizado = {
        ...produtodoUsuario, 
        ...req.body
    } 

    await db.updateProduct(
        produtoAtualizado.nome, 
        produtoAtualizado.estoque, 
        produtoAtualizado.categoria, 
        produtoAtualizado.preco, 
        produtoAtualizado.descricao, 
        produtoAtualizado.imagem,
        produtoAtualizado.id
    )

    res.send ({
        nome: produtoAtualizado.nome,
        estoque: produtoAtualizado.estoque,
        categoria: produtoAtualizado.categoria,
        preco: produtoAtualizado.preco, 
        descricao: produtoAtualizado.descricao,
        imagem: produtoAtualizado.descricao
    })

}

const deleteprodutosid = async (req, res) => {
    if(req.headers.authorization === undefined){
        res.send ({msg: "Necesitas poner un token!!!"})
        return
    }
    const user = sc.decode(req.headers.authorization)

    if (user === null){
        res.send ({msg: "Token inválido"})
        return
    }
    const produtodoUsuario = await db.selectProduct(req.params.id)
    if (produtodoUsuario === null){
        res.send ({msg: "Este producto no existe, insertar un otro id"})
        return
    }
    
    if (produtodoUsuario.usuario_id !== user.id){
        res.send ({msg: "El id de este producto no pertenece a ti. Por favor suba otro id"})
        return
    }

    await db.deleteProduct(req.params.id)

    res.send ({msg: "OLEEEEEEEEE, HAS CONSEGUIDO MUCHACHOOO!"})
}


module.exports = {
    postprodutos,
    getprodutos,
    getprodutosid,
    putprodutosid,
    deleteprodutosid        
}