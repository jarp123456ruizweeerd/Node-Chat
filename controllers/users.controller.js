const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    

    //TODO: Operacion que se toma mayor tiempo en ejecutarse
    // //Lo que recive dentro de la funcion 'find' significa lo siguiente
    // //traeme el total de registros que tengan el estado en true
    // const usuarios = await Usuario.find({estado:true})
    // .skip(Number(desde))
    // .limit(Number(limite));
    
    // //Lo que recive dentro de la funcion 'countDocuments' significa lo siguiente
    // //traeme el total de registros que tengan el estado en true
    // const numero_colecciones = await Usuario.countDocuments({estado:true});
    // res.json({
    //     msg: 'get API - controllador',
    //     usuarios,
    //     numero_colecciones
    // })

    //TODO: Operacion mejorada
    const [total_colecciones, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite)),
    ])

    res.json({
        msg:'Get Usuarios',
        total_colecciones,
        usuarios
    })

}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = Usuario({ nombre, correo, password, rol });
    

    //Encriptar contraseña
    const encrip = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, encrip);

    //Guardar en la BD
    await usuario.save();
    res.json({
        msg: 'Usuario Creado!!!',
        usuario
    })
}
const usuariosPut = async (req, res) => {

    const id = req.params.id;

    const { password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto);



    res.json({ msg: 'put API', usuarioActualizado })
}

const usuariosPatch = (req, res) => { 
    res.json({ msg: 'patch API' })
} 

const usuariosDelete = async (req = request, res = response) => {
    const id = req.paxrams.id;
    console.log('Id del params: ', id);
   
    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado:false});

    const usuarioAuth = req.usuarioAuth;

    // console.log('Request: ', req)
    res.json({ msg: 'Usuario Eliminado', usuarioEliminado, usuarioAuth  })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}