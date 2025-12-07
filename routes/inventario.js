const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validarJWT, validarRolAdmin } = require('../middleware/validar-jwt'); // Importamos los middlewares

const router = Router();

// --- RUTA 1: CREAR INVENTARIO (Solo Admin) ---
// el segundo argumento: es un array de middlewares que se ejecutan en orden.
// 1. validarJWT: ¿Tiene token válido?
// 2. validarRolAdmin: ¿Es administrador?
router.post('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        console.log("Intentando crear inventario...");
        
        // Validación básica de campos
        if (!req.body.serial || !req.body.modelo) {
             return res.status(400).send('Faltan datos obligatorios');
        }

        const inventario = new Inventario(req.body);
        
        // Asignamos el ID del usuario que viene en el token (quien está creando el registro)
        inventario.usuario = req.payload.id; 
        
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        await inventario.save();
        res.send(inventario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al guardar');
    }
});

// --- RUTA 2: LISTAR INVENTARIOS (Cualquier usuario logueado) ---
// Aquí solo usamos [validarJWT], porque el docente SÍ puede ver.
router.get('/', [validarJWT], async function(req, res) {
    try {
        // .populate() sirve para que no salga solo el ID de la marca, sino el objeto completo con nombre
        const inventarios = await Inventario.find().populate([
            { path: 'usuario', select: 'nombre email' }, // Mostrar nombre del creador
            { path: 'marca', select: 'nombre' },
            { path: 'estadoEquipo', select: 'nombre' },
            { path: 'tipoEquipo', select: 'nombre' }
        ]);
        
        res.send(inventarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar');
    }
});

module.exports = router;