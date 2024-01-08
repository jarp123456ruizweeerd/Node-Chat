const express = require('express');
// const app = express();
const cors = require('cors');
const {coneccion} = require('../db/config'); 
const { socketController } = require('../socket/socket.controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require("http").Server(this.app);
        this.io = require('socket.io')(this.server);
        //Llamado a la bd
        this.connectar();


        //Midelware
        this.midlewares()
        
        this.authPath = '/api/auth';
        this.usersPath = '/api/usuarios'; 
        this.routes();

        //Sockets
        this.sockets();

    }

    async connectar(){
        await coneccion();
    }

    midlewares() {
        this.app.use(cors());

        //Lectura y parsea del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'));

    }


    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));
        
    }

    sockets(){
        this.io.on('connection', (socket) => socketController(socket, this.io))

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Escuchando por el puerto ', this.port)
        });
    }


}

module.exports = Server