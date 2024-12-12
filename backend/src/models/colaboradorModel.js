const mongoose = require('mongoose');

// Esquema para los colaboradores
const colaboradorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que no haya duplicados
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validación básica para direcciones de email
    },
    nombre: {
        type: String,
        required: true
    },
    habilidades: {
        type: [String], // Array de términos (habilidades del colaborador)
        default: []
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Colaborador', colaboradorSchema);