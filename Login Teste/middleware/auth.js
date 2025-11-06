// middleware/auth.js

const jwt = require('jsonwebtoken');

// 💡 Esta é uma função middleware: recebe (req, res, next)
module.exports = function(req, res, next) {
    // 1. Tenta pegar o token do cabeçalho 'Authorization' (Bearer Token)
    // O cliente envia: Authorization: Bearer <TOKEN_AQUI>
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

    // 2. Verifica se o token existe
    if (!token) {
        // 401: Não autorizado (não há credenciais)
        return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // 3. Verifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave_padrao_insegura');
        
        // 4. Salva os dados do usuário no objeto de requisição (req.usuario)
        req.usuario = decoded; 
        
        // 5. Chama a próxima função da rota (permite o acesso)
        next(); 

    } catch (e) {
        // Se a verificação falhar (token inválido ou expirado)
        // 403: Acesso proibido (credenciais inválidas)
        res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
    }
};