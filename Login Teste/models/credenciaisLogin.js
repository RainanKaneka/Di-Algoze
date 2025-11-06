const { DataTypes } = require('sequelize');
const sequelize = require('../db/db').sequelize; 


const Usuario = sequelize.define('Usuario', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garante que não haja emails duplicados
        validate: {
            isEmail: true // Valida se é um formato de email válido
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'usuarios',
    timestamps: true 
});

module.exports = Usuario;