const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    const clave = req.header('clave');

    if (!clave) {
        res.status(401).json({
            msg: 'No hay token en la patición'
        })
    }

    try {
        const { uid } = jwt.verify(clave, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Tokén no valido - no existe el usuario'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Tokén no valido - estado : false'
            })
        }

        req.usuarioAuth = usuario;

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}



module.exports = {
    validarJWT,
   
}