const Rol = require('../models/role');
const Usuario = require('../models/usuario');
const validarRol = async (r) => {
    const rolExistente = await Rol.findOne({rol:r})
    if(!rolExistente){
        throw new Error(`El rol ${r} no existe en la BD`);
    }
}

const validarEmail = async (c) => {
    const emailValido = await Usuario.findOne({correo:c});
    if(emailValido){
        throw new Error(`El correo (${c}) ya existe en la BD`)
    }
}


const validarId = async (id) => {
    
    const idEliminar = await Usuario.findById(id);
    if(!idEliminar){
        throw new Error (`Este usuario ${id} no existe en la BD`);
    }
}


module.exports = {
    validarRol,
    validarEmail,
    validarId
}