
const btn = document.querySelector('#guardar');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const formulario = document.getElementById('form');
    const data = new FormData(formulario);

    let info = {}
    for (const element of data.entries()) {
        console.log(element[0] + ':' + element[1]);
        info[element[0]] = element[1];
    }


    
    fetch('http://localhost:2000/api/auth/login', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(info)
    })
    .then((res) => res.json())
    .then((res) => {
        console.log('Res Final: ', res);
        localStorage.setItem('token', res.token);
        window.location = '/chat.html';
    })

})


//Función para el google-SingIn

function handleCredentialResponse(response) {

    const obj = { msg: 'Todo bien!', id_token: response.credential }
    fetch('http://localhost:2000/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            localStorage.setItem('token', res.token_generado);
            window.location = '/chat.html'
        })
        .catch(console.warn);

    const btnLogout = document.querySelector('#btn_logout');

    btnLogout.addEventListener('click', () => {
        google.accounts.id.revoke(localStorage.getItem('email'), done => {
            localStorage.clear();
            location.reload();
        });

    })
}
