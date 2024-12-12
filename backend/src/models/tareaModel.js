const mongoose = require('mongoose');

// Esquema para las tareas
const tareaSchema = new mongoose.Schema({
    responsable: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validación básica para direcciones de email
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 50 // Límite de 50 caracteres
    },
    habilidades: {
        type: [String], // Array de términos (habilidades necesarias)
        default: []
    },
    segmentos: {
        type: Number,
        required: true,
        min: 1 // Al menos 1 segmento de duración
    },
    colaboradores: {
        type: [String],  // Lista de correos electrónicos de los colaboradores
        default: []
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Tarea', tareaSchema);