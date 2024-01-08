const txtOnline = document.querySelector('#txtOnline');


const txtUsrConectados = document.querySelector('#txtUsrConectados');

const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');


let data = null;
let socketChat = null;


const verificarToken = async () => {
    const token = localStorage.getItem('token');

    if (token.length <= 10) {
        window.location = 'index.html'
        throw new Error('Token no valido, su longitud ha sido modificado')
    }


    const res = await fetch('http://localhost:2000/api/auth', {
        headers: { 'clave': token }
    });

    data = await res.json();
    localStorage.setItem('token-chat', data.token_generado);
    document.title = data.usuarioAuth.nombre;


    await conectarSocket()


}


const conectarSocket = async () => {

    socketChat = io({
        'extraHeaders': {
            'clave': localStorage.getItem('token-chat')
        }
    })

    socketChat.on('connect', () => {
        txtOnline.className = 'text-primary fw-bolder';
        txtOnline.innerText = 'Conectado'
    })

    socketChat.on('disconnect', (usuarios) => {
        txtOnline.className = 'text-danger fw-bolder';
        txtOnline.innerText = 'Desconectado'
        console.log(usuarios)


    })


    socketChat.on('recibir-mensajes', (payload) => {
        mensajesView(payload);

    })
    socketChat.on('usuarios-activos', usuariosView)


    socketChat.on('mensaje-privado', (payload) => {
        console.log(payload);
    })

}
const usuariosView = (usuarios = []) => {
    txtUsrConectados.innerText = `${usuarios.length}`;
    let usuariosHTML = ''
    // for (const iterator of usuarios) {
    //     console.log('Iterado', iterator.nombre);
    //     usuariosHTML +=
    //         `<li>
    //             <p>
    //                 ${iterator.nombre}
    //             </p>
    //         </li>`
    //     // ulUsuarios.innerHTML += '<hr>'
    // }

    usuarios.forEach((u) => {
      
        usuariosHTML +=
            `<li class='item-usuario' id='item-usuario' onclick='ingresarItem()'>
                    <p>
                        ${u.nombre}
                    </p>
                    <p class='fw-bolder'>
                    ${u.uid}
                 </p>
                </li>`
      
    })

    ulUsuarios.innerHTML = usuariosHTML;
    // console.log(usuarios);

}


const ingresarItem = () => {
    alert('Usuario');
}


const mensajesView = (mensajes = []) => {
    let mensajesHTML = ''
    mensajes.forEach(({ nombre, mensaje }) => {
        mensajesHTML +=
            `<li>
                    <p>
                       ${nombre} : ${mensaje}
                    </p>

                </li>`
        // }
    })

    ulMensajes.innerHTML = mensajesHTML;
    // console.log(usuarios);

}




txtMensaje.addEventListener('keyup', (e) => {

    let mensaje = txtMensaje.value;
    let uid = txtUid.value;
    if (e.keyCode != 13) {
        return;
    }
    if (mensaje.length == 0) {
        return;
    }


    socketChat.emit('enviar-mensaje', { mensaje, uid });






})




const main = async () => {
    await verificarToken();
}

main();