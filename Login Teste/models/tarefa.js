const { DataTypes } = require('sequelize');
const sequelize = require('../db/db').sequelize; // Supondo que você use esta configuração

const Tarefa = sequelize.define('Tarefa', {
   
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  texto: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  
  concluida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }


}, {
    tableName: 'tarefas',
    timestamps: true 
});

module.exports = Tarefa;