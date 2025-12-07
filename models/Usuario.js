const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Importante: evita duplicados de correo
    },
    estado: {
        type: String,
        required: true,
        default: 'Activo',
        enum: ['Activo', 'Inactivo'] // Solo permite estos dos valores
    },
    password: {
        type: String,
        required: true
        // Aquí se guardará el HASH (ej: $2a$10$....), nunca la clave real
    },
    rol: {
        type: String,
        required: true,
        enum: ['administrador', 'docente'] // OJO: Si mandas otro rol, fallará
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);