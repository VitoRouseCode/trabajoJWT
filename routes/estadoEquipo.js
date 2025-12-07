const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validarJWT, validarRolAdmin } = require('../middleware/validar-jwt');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        let estado = new EstadoEquipo();
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado;
        estado.fechaCreacion = new Date();
        estado.fechaActualizacion = new Date();
        estado = await estado.save();
        res.send(estado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const estados = await EstadoEquipo.find();
        res.send(estados);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;