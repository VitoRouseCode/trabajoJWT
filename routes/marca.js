const { Router } = require('express');
const Marca = require('../models/marca');
const { validarJWT, validarRolAdmin } = require('../middleware/validar-jwt');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
        marca = await marca.save();
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const marcas = await Marca.find();
        res.send(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;