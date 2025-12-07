const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

getConnection();

// --- ZONA DE RUTAS ---
app.use('/usuario', require('./routes/usuario')); // Ruta para crear usuarios
app.use('/login', require('./routes/auth'));      // Ruta para hacer login
app.use('/inventario', require('./routes/inventario'));
app.use('/marca', require('./routes/marca'));
app.use('/tipo-equipo', require('./routes/tipoEquipo'));
app.use('/estado-equipo', require('./routes/estadoEquipo'));
// ---------------------

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});