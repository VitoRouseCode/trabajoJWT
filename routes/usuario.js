const { Router } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Importamos la librería de encriptación

const router = Router();

// CREAR USUARIO (POST)
router.post('/', async function(req, res) {
    try {
        console.log('Recibiendo petición de creación de usuario...');
        
        // 1. Validar si el email ya existe
        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        // 2. Crear la instancia del modelo Usuario
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.rol = req.body.rol; // 'administrador' o 'docente'

        // 3. ENCRIPTAR LA CONTRASEÑA (Paso crítico de seguridad)
        const salt = bcrypt.genSaltSync(); 
        const password = req.body.password; 
        usuario.password = bcrypt.hashSync(password, salt); // Encripta

        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        // 4. Guardar en BD
        usuario = await usuario.save();

        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear usuario');
    }
});

// LISTAR USUARIOS (GET) - Para verificar qué hay en la BD
router.get('/', async function(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;