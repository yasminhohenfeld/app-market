const db = require('../databases');
const sc = require('../security');
const { createProductSchemas, updateProductSchemas } = require('../validations/productSchemas')


const postprodutos = async (req, res) => {

    try {
        await createProductSchemas.validate(req.body)

        if(req.headers.authorization === undefined){
            return res.send ({msg: "Insira um token!!!!"})        
        }
        const user = sc.decode(req.headers.authorization)

        if (user === null){
            res.send ({msg: "Token inválido"})
            return
        }

        await db.insertProduct(req.body.nome, req.body.estoque, categoria, req.body.preco, req.body.descricao, imagem, user.id)

        res.send({msg: {
            "nome": req.body.nome,
            "estoque": req.body.estoque,
            "categoria": req.body.categoria,
            "preco": req.body.preco, 
            "descricao": req.body.descricao,
            "imagem": req.body.imagem
        }})
    }catch (error){
        return res.status(500).json(error.message)
    }
}

const getprodutos = async (req, res) => {

    try {

        if(req.headers.authorization === undefined){
            res.send ({msg: "Insira um token !!!!"})
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
    }catch (error){
        return res.status(500).json(error.message)
    }
}


const getprodutosid = async (req, res) =>{

    try {
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
    }catch (error){
        return res.status(500).json(error.message)
    }
}

//validar body 
// try catch

const putprodutosid = async (req, res) => {

    try{
        await updateProductSchemas.validate(req.body)


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
    }catch (error){
        res.status(500).json(error.message)
    }
}


const deleteprodutosid = async (req, res) => {
    try {
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
    }catch (error){
        return res.status(500).json(error.message)
    }
}


module.exports = {
    postprodutos,
    getprodutos,
    getprodutosid,
    putprodutosid,
    deleteprodutosid        
}