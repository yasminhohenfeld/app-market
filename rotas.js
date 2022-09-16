const express = require('express');
const bodyParser = require('body-parser')
const usuario = require('./controladores/usuario');
const login = require ('./controladores/login');
const perfil = require('./controladores/perfil');
const produtos = require('./controladores/produtos')


const app = express();
app.use(bodyParser.json());

//usuario
app.post('/usuario', usuario.postusuario);


//login
app.post('/login', login.postlogin);

//perfil
app.get('/perfil', perfil.getperfil);
app.put('/perfil', perfil.putperfil);

//produtos
app.post('/produtos', produtos.postprodutos);
app.get('/produtos', produtos.getprodutos);
app.get('/produtos/:id',produtos.getprodutosid);
app.put('/produtos/:id', produtos.putprodutosid);
app.delete('/produtos/:id', produtos.deleteprodutosid);

module.exports = {
    app
}