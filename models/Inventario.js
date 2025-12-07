const mongoose = require('mongoose');

const InventarioSchema = mongoose.Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    modelo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    foto: {
        type: String, 
        required: true
    },
    color: {
        type: String,
        required: true
    },
    fechaCompra: {
        type: Date,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    // RELACIONES (Foreign Keys)
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    estadoEquipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },
    tipoEquipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true
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

module.exports = mongoose.model('Inventario', InventarioSchema);