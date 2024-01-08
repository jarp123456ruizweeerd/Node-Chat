const { request, response } = require("express");


const validarRolJWT = (req = request, res = response, next) => {

    
    

    if(!req.usuarioAuth){
        return res.status(404).json({
            msg : 'Error no se puede validar el token si no hay un usuario Autenticado'
        })
        
    }
    const {rol} = req.usuarioAuth;
    
    if(rol !== 'ADMIN'){
        return res.status(404).json({
            msg : 'Solo un ADMIN puede ejecutar esta accion'
        })
    }

    next();


}


module.exports = {
    validarRolJWT
}
