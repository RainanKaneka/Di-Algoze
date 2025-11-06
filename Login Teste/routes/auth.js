const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/credenciaisLogin")
const authMiddleware = require('../middleware/auth');

// ROTAS pra registrar usuario e senha

// router.get('/', (req,res) => {
//     // res.send("O servidor está funcionando.")
//     res.sendFile(__dirname + '/index.html')
// })

router.post('/register', async (req, res) => {



    try {


        // Pegando as informações do Body

        const { nome, email, senha } = req.body


        // Verifico se o e-mail já existe

        const usuarioExistente = await Usuario.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ erro: 'Este e-mail ja está cadastrado.' })
        }

        // Criptografar a senha

        const salt = await bcrypt.genSalt(10)

        const senhaCriptografada = await bcrypt.hash(senha, salt)

        // Salvar o usuario no banco de dados

        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada
        });

        res.status(201).json({
            mensagem: "Conta criada!",
            id: novoUsuario.id,
            email: novoUsuario.email
        });
    }
    catch (error) {
        res.status(500).json({ erro: 'Erro ao criar uma conta', detalhes: error })
        res.status(500).json({ erro: 'Erro interno do servidor', detalhes: error.message });
    }




});

router.post('/login', async (req, res) => {

    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { email } })

        if (!usuario) {
            return res.status(400).json({ erro: 'Credenciais inválidas.' })
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ erro: 'Credenciais inválidas.' })
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, // Payload: O que vai DENTRO do token
            process.env.JWT_SECRET || 'chave_padrao_insegura', // Chave secreta
            { expiresIn: '1h' } // Expira em 1 hora


        );

       


        res.json({
            mensagem: "Login bem-sucedido",
            token: token, // O cliente (Front-end) salva este token
            usuarioId: usuario.id
        })

          



    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ erro: 'Erro interno do servidor', detalhes: error.message });
    }

})


router.get('/secret', authMiddleware, (req, res) => {
    // Se o middleware liberar, o código aqui é executado.
    // req.usuario contém os dados do token decodificado!
    res.json({
        mensagem: `Acesso concedido! Bem-vindo, usuário ID: ${req.usuario.id}`,
        dadosProtegidos: "Você está logado e pode ver esta informação."
    });
});


module.exports = router;