const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')


const generarJWT = async (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn : '5h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('Surgio un error');
            }else{
                resolve(token);
            }
        })
    })

}

const validarSocketJWT = async (socket = '') => {

    try {
        if (socket.length < 10) {
            return null;
        }

        const {uid} = jwt.verify(socket, process.env.SECRETORPRIVATEKEY);
        console.log('Validacion: ', uid);
        const usuario = await Usuario.findById(uid);
      
        return usuario;

        // if (usuario) {
        //     if (usuario.estado) {
        //         return usuario;
        //     } else {
        //         return null;
        //     }
        // } else {
        //     return null;
        // }

    } catch (error) {
        throw new Error(error);
    }



}



module.exports = {
    generarJWT,
    validarSocketJWT
}