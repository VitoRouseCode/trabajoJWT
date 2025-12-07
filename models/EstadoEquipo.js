const mongoose = require('mongoose');

const EstadoEquipoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: 'Activo',
        enum: ['Activo', 'Inactivo']
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

module.exports = mongoose.model('EstadoEquipo', EstadoEquipoSchema);