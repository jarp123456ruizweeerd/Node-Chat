const { Router } = require('express')
const { check } = require('express-validator');

const { login, sigIn, revalidarToken } = require('../controllers/auth.controller');

const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

router.post('/login',
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'Se requiere de una contraseña').not().isEmpty(),
        validarCampos]

    , login);



router.post('/google',
    [
        check('id_token', 'Se requiere el token').not().isEmpty(),
        validarCampos]
    , sigIn);



router.get('/', validarJWT, revalidarToken )


module.exports = router;