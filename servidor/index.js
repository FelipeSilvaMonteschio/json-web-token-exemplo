// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');
const app = express();

app.set('view engine', 'ejs');
app.use(cors());

const crypto = require('./crypto')

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




app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.get('/usuarios/listar',async function(req, res){

  let usuarios = await usuario.findAll()

  res.render('listauser', {usuarios});
})

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('cadastro');
})

app.post('/logar', (req, res) => {
  const dados = req.body;
  let usuarioT = usuario.findOne({ where: { usuario: req.query.nome } })
  let usuarioS = usuario.findOne({ where: { senha: req.query.senha } })
  
  if(dados.usuario === "felipe@teste" && dados.senha === "123" || dados.usuario == usuarioT  ){
    const id = '1'
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 30000
    })
    res.cookie('token', token, { httpOnly: true })
    return res.redirect('/') //home
  }
  res.status(500).json({ mensagem: "login Inválido" })
  console.log(usuarios)
})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, { httpOnly: true })
  res.redirect('/autenticar')
})

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

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});