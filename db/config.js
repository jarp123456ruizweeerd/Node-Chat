const mongoose = require('mongoose');

const coneccion = async () => {
    try {
        await mongoose.connect(process.env.CONECCION);
        console.log('Conexion exitosa') 
        
    } catch (error) {
        throw new Error(error,' Error al iniciar la base de datos')
    }
} 


module.exports = {
    coneccion 
} 