const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
        console.log('✅ Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.log(error);
        throw new Error('❌ Error al conectar a la base de datos');
    }
}

module.exports = {
    getConnection
}