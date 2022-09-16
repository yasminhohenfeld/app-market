create table usuarios (
  id serial not null primary key, 
  nome varchar not null,
  nome_loja varchar not null,
  email varchar not null,
  senha varchar not null
);


create table produtos (
  id serial not null primary key, 
  usuario_id int not null references usuarios(id),
  nome varchar not null, 
  estoque int not null, 
  categoria varchar not null, 
  preco int not null,
  descricao varchar not null,
  imagem varchar not null
);
