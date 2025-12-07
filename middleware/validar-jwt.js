const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // CORRECCIÓN: Usamos 'let' en lugar de 'const' porque vamos a modificar la variable abajo
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Error: No hay token en la petición' });
    }

    // --- LIMPIEZA DEL TOKEN ---
    // Si el token viene con la palabra "Bearer " al inicio, la quitamos.
    if (token.startsWith('Bearer ')) {
        // Como ahora es 'let', Javascript nos permite sobrescribir la variable
        token = token.slice(7, token.length); 
        console.log("Token limpio:", token); // Log para verificar
    }

    try {
        // 2. Verificamos la firma usando nuestra palabra secreta
        // Si el token fue modificado o expiró, esta línea lanza un error (catch)
        // OJO: Asegúrate de que process.env.SECRET_KEY tenga valor
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        
        console.log("Payload decodificado:", payload);

        // 3. Guardamos los datos del usuario en la petición (req)
        req.payload = payload; 
        
        // 4. Dejamos pasar la petición
        next();

    } catch (error) {
        console.log("Error al verificar token:", error.message);
        return res.status(401).json({ message: 'Token no válido' });
    }
}

const validarRolAdmin = (req, res, next) => {
    if (req.payload.rol !== 'administrador') {
        return res.status(403).json({ message: 'Acceso denegado: No tienes permisos de administrador' });
    }
    next();
}

module.exports = {
    validarJWT,
    validarRolAdmin
}