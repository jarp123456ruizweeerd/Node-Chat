const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();


async function googleVerify(token) {

    // console.log('Token: ', token.id_token);
    const ticket = await client.verifyIdToken({
        idToken: token.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const { name, picture, email } = payload;

    return {
        nombre: name,
        img: picture,
        correo : email,
    }
}


module.exports = {
    googleVerify
}
