const express = require('express')
const cors = require("cors");
const app = express()
const path = require('path');
const { sequelize } = require('./db/db');
const port = 5500
// const projetosRouterSimples = require('./routes/projetos_router_simples')
// const tarefasRouter = require('./routes/tarefas')
const authRouter = require('./routes/auth')

const dotenv = require("dotenv");
dotenv.config();

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });


app.use(express.static(path.join(__dirname, '.')));
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))


app.use('/api/auth', authRouter)
// app.use('/api/conta', tarefasRouter)
// app.use('/api/tarefas', tarefasRouter)
// app.use('/api/simples/projetos', projetosRouterSimples);


// app.get('/', (req, res) => {

//     res.send("Inicio")

// })

// app.get('/sobre', (req, res) => {
//     res.send('Estou estudando backend básico')
// })

app.get("/ola/:nome", (req, res) => {

  let { nome } = req.params

  res.send(`Olá, ${nome}!, seja bem-vindo ao Backend! `)

})


// app.post('/projetos/novo', (req, res) => {

//     const novoProjeto = req.body;

//     const titulo = novoProjeto.titulo;

//     const ano = novoProjeto.ano;

//     res.json({
//         mensagem: `Projeto ${titulo} criado com sucesso!`,
//         ano: ano
//     })



// })


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

