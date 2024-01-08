const {request, response} = require('express');
const Usuario = require('../models/usuario');

const validarUsuarioEliminar = async (req = request, res = response, next) => {

    const id = req.params.id;
    const usuarioEliminado = await Usuario.findById(id);
     
    if(!usuarioEliminado.estado){
        return res.status(404).json({
            msg: 'No existe el usuario que intenta eliminar'
        })
    }

    next();
}


module.exports = {
    validarUsuarioEliminar
}