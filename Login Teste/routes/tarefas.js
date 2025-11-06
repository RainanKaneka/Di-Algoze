// routes/tarefas.js
const express = require('express');
const router = express.Router();
const Tarefa = require('../models/tarefa'); 

// ROTA 1: CRIAR NOVA TAREFA
router.post('/', async (req, res) => {
    try {
        const { titulo, texto } = req.body;
        
        // 💡 Use Tarefa.create() para salvar a tarefa no banco.
        // O campo 'concluida' será automaticamente 'false' pelo padrão.
        const novaTarefa = await Tarefa.create({ 
            titulo: titulo,
            texto: texto // O corpo da requisição fornece apenas o título
        });
        
        // Retorna a tarefa criada e um status 201 (Created)
        res.status(201).json(novaTarefa);
    } catch (error) {
        // Se houver erro de validação (ex: título vazio) ou de conexão
        res.status(500).json({ erro: 'Erro ao criar tarefa', detalhes: error.message });
    }
});

// ROTA 2: BUSCAR TODAS AS TAREFAS
router.get('/', async (req, res) => {
    try {
        // 💡 Use o método do Sequelize para buscar todos os registros.
        const tarefas = await Tarefa.findAll(); 
        
        res.json({ results: tarefas });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar tarefas', detalhes: error.message });
    }
});

// ROTA 3: ATUALIZAR TAREFA (PUT /api/tarefas/:id)

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID da tarefa a ser atualizada
        const { titulo, concluida } = req.body; // Dados que podem mudar
        
        // 💡 Use Tarefa.update()
        // O primeiro argumento é o objeto com os novos valores.
        // O segundo argumento é a cláusula WHERE para saber qual registro mudar.
        const [rowsUpdated] = await Tarefa.update(
            { titulo, concluida },
            { where: { id: id } }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        
        // Retornamos a mensagem de sucesso
        res.json({ mensagem: 'Tarefa atualizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar tarefa', detalhes: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID da tarefa a ser deletada
        
        // 💡 Use Tarefa.destroy()
        const rowsDeleted = await Tarefa.destroy({
            where: { id: id }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }
        
        // Retorna sucesso
        res.status(204).send(); // Status 204: No Content (Sucesso, sem corpo de resposta)

    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar tarefa', detalhes: error.message });
    }
});


module.exports = router;