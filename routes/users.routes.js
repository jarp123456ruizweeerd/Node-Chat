const { Router } = require('express')
const { check } = require('express-validator');
const router = Router();

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users.controller');
const { validarRol, validarEmail, validarId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validacion-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarRolJWT } = require('../middlewares/validarrol-jwt');

const {
    validarCampos,
    validarJWT,
    validarRolJWT,
    validarUsuarioEliminar } = require('../middlewares/index');


router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'Nombre requerido').not().isEmpty(),
    check('correo', 'Correo Invalido').isEmail(),
    check('correo').custom((c) => validarEmail(c)),
    check('password', 'Ingresa al menos 6 caracteres').isLength({ min: 6 }),
    // check('rol','No es un rol permitido').isIn(['ADMIN','USUARIO']),
    check('rol').custom((r) => validarRol(r)),
    validarCampos,
], usuariosPost)

router.put('/:id', [
    check('id', 'Este id no es correcto').isMongoId(),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch); 

router.delete('/:id', [
    validarJWT,
    validarRolJWT,
    validarUsuarioEliminar,
    check('id', 'NO es un id valido').isMongoId(),
    check('id').custom((id) => validarId(id)),
    validarCampos,
], usuariosDelete)

module.exports = router;
