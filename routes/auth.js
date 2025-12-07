const { Router } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importamos JWT

const router = Router();

// LOGIN (POST)
router.post('/', async function(req, res) {
    try {
        // 1. Validar que el usuario exista por su email
        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // 2. Validar la contraseña (comparar texto plano vs encriptada en BD)
        const esIgual = bcrypt.compareSync(req.body.password, usuario.password);
        if (!esIgual) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // 3. Generar el JWT (El "brazalete")
        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol // IMPORTANTE: Guardamos el rol en el token
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h' // El token expira en 1 hora
        });

        // 4. Responder con el token y datos básicos
        res.json({
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            access_token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;