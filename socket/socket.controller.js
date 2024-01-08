const { Socket } = require("socket.io");
const { validarSocketJWT } = require("../helpers/generar-jwt");
const Chat = require('../models/chat');

const chatMensajes = new Chat();

const socketController = async (socket = new Socket(), io) => {


    const data = await validarSocketJWT(socket.handshake.headers.clave);

    if (!data) {
        return socket.disconnect();
    }

    chatMensajes.conectarUsuario(data);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);


    socket.join(data.id);
    console.log('Join', data.nombre);

 
    socket.on('enviar-mensaje', ({ mensaje, uid }) => {
        
        if (uid) {
            socket.to(uid).emit('mensaje-privado', { de: data.nombre, mensaje });
        } else {
            chatMensajes.enviarMensaje(data.id, data.nombre, mensaje);
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }



    })


    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(data.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
        console.log('Se elimno a:', data.nombre);


    })


}


module.exports = {
    socketController
}