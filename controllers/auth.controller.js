const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;
    try {
        //Verificar email
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontro el correo: ${correo}`
            })
        }

        //Verificar si esta activo
        if (!usuario.estado) {
            return res.status(404).json({
                msg: `El usuario no esta activo- estado`
            })
        }

        //Verificar pass
        const validarPass = bcryptjs.compareSync(password, usuario.password);
        if (!validarPass) {
            return res.status(404).json({
                msg: `El usuario erroneo - password`
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login Online',
            usuario,
            token
        })

    } catch (error) {
        res.json({
            msg: 'Error: ', error
        })

    }

}

const sigIn = async (req = request, res = response) => {



    try {
        const token = req.body;

        const {nombre, img, correo} = await googleVerify(token);
        
        let usuario = await Usuario.findOne({correo});
        
       
        if(!usuario){
            nuevo_usuario = {
                nombre,
                correo,
                password : '1234',
                img,
                google:true,
                rol: 'USUARIO'
            }
            usuario = new Usuario(nuevo_usuario);
            await usuario.save();
        }



        if(!usuario.estado){
            return res.status(401).json({
                msg : 'El usuario ya no esta displible, comuniquese con el admin'
            })
        }


        const token_generado = await generarJWT(usuario.id);


        res.json({
            msg: 'Token Valido!',
            usuario,
            token_generado
        })
    } catch (error) {
        console.log('Error: ', error)
        res.json(400).json({
            ok: false,
            msg: 'Bad Request'
        })
    }
}




const revalidarToken = async (req = request, res = response) => {
    // console.log(req.usuarioAuth);
    const usuarioAuth = req.usuarioAuth;

    const token_generado = await generarJWT(usuarioAuth.id);
    res.json({
        msg : 'Todo bien',
        usuarioAuth,
        token_generado

    })
}

module.exports = {
    login,
    sigIn,
    revalidarToken
}