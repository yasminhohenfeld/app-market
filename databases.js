const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'market_yh',
    password: 'admin',
    port: 5432
});

const query = (sql, param) => {
    return pool.query(sql, param);
} 

const selectUser = async (email) =>{

    const sqlSelect = 'select email, senha, nome, nome_loja, id from public.usuarios where email=$1'
    const paramsSelect = [email]
    const results = await query(sqlSelect, paramsSelect)
    
    if (results.rowCount === 0){
        return null
    }
    return results.rows[0]
}

const updateUser = async (nome, email, senha, nome_loja, id) => {

    const sqlUpdate = `
        update public.usuarios 
        set nome=$1,
            email=$2,
            senha=$3,
            nome_loja=$4
        where id=$5
    `
    const paramsSelect = [nome, email, senha, nome_loja, id]
    await query (sqlUpdate, paramsSelect)

}

const insertProduct = async (nome, estoque, categoria, preco, descricao, imagem, usuario_id) =>{
    

    const sqlInsert = `
        insert into public.produtos
        (nome, estoque, categoria, preco, descricao, imagem, usuario_id) 
        values ($1, $2, $3, $4, $5, $6, $7) 
    `
  
    const paramsInsert = [nome, estoque, categoria, preco, descricao, imagem, usuario_id]
    await query (sqlInsert, paramsInsert)

}

const selectProducts  = async (categoria, usuario_id) => {


    const sqlSelect = `
        select id, usuario_id, nome, estoque, categoria, preco, descricao, imagem
        from public.produtos 
        where usuario_id=$1 and ($2::varchar is null or categoria=$2::varchar)
    `

    const paramsSelect = [usuario_id, categoria]
    const results = await query(sqlSelect, paramsSelect)
    
    return results.rows

}

const selectProduct = async (id) => {
    
    const sqlSelect =  `
        select id, usuario_id, nome, estoque, categoria, preco, descricao, imagem
        from public.produtos 
        where id=$1
    `

    const paramsSelect = [id]
    const results = await query(sqlSelect, paramsSelect)

    if (results.rowCount === 0){
        return null
    }
    return results.rows[0]
}

const updateProduct = async (nome, estoque, categoria, preco, descricao, imagem, id) => {

    const sqlUpdate = `
    update public.produtos
    set nome=$1,
        estoque=$2,
        categoria=$3,
        preco=$4,
        descricao=$5,
        imagem=$6
    where id=$7
    `
    const paramsUpdate = [nome, estoque, categoria, preco, descricao, imagem, id]
    await query (sqlUpdate, paramsUpdate)

}

const deleteProduct = async (id) => {
    
    const sqlDelete = `
        delete 
        from public.produtos
        where id=$1
    `
    const paramsDelete = [id]
    await query (sqlDelete, paramsDelete)

}




module.exports = {
    query,
    selectUser,
    updateUser,
    insertProduct,
    selectProducts,
    selectProduct,
    updateProduct,
    deleteProduct
       
}