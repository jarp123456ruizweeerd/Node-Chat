
const validarCampos = require('../middlewares/validacion-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRolJWT = require('../middlewares/validarrol-jwt');
const validarUsuarioEliminar = require('../middlewares/validar-usuarioEliminar');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRolJWT,
    ...validarUsuarioEliminar
}



