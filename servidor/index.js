// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');
const crypto = require('./crypto')
const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar"] })
);

// Pagina Autenticar
app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

// Autenticar
app.post('/logar', async (req, res)=> {
  let Nome = req.body.usuario; let Senha = req.body.senha

  
  const autorizado = await usuario.findOne ({  
    where: { nome: req.body.usuario, senha: crypto.encrypt(req.body.senha) 
    } });


  if( autorizado ){
    const id = '1'
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 30000 })
    res.cookie('token', token)
    return res.redirect('/')
  }
  res.status(500).json({ mensagem: "login Inválido" })
})

//Home
app.get('/', async function(req, res){
  res.render("home")
})

// Pagina de Cadastro
app.get('/usuarios/cadastrar', async function(req, res){
  res.render('cadastro');
})

// Cadastro
app.post('/usuarios/cadastrar', async function(req, res){

  if(req.body.senha === req.body.senhacf){
    const novusuario = req.body
    novusuario.senha = crypto.encrypt(novusuario.senha);
    await usuario.create(novusuario);
    res.redirect('/usuarios/listar')
  }else{
    console.log('usuario não cadastrado tente novamente')
  }
})

// Lista de usuarios
app.get('/usuarios/listar',async function(req, res){

  let usuarios = await usuario.findAll()

  res.render('listauser', {usuarios});
})

// Deslogar
app.post('/deslogar', function(req, res) {
  res.cookie('token', null)
  res.redirect('/autenticar')
})

// Servidor Test
app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});