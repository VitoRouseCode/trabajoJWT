const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validarJWT, validarRolAdmin } = require('../middleware/validar-jwt');

const router = Router();

router.post('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        let tipo = new TipoEquipo();
        tipo.nombre = req.body.nombre;
        tipo.estado = req.body.estado;
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();
        tipo = await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const tipos = await TipoEquipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;