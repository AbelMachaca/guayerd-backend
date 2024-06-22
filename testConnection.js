const jsforce = require('jsforce');
require('dotenv').config();

const conn = new jsforce.Connection({
    oauth2: {
        loginUrl: process.env.SF_LOGIN_URL,
        clientId: process.env.SF_CLIENT_ID,
        clientSecret: process.env.SF_CLIENT_SECRET,
        redirectUri: process.env.SF_REDIRECT_URI
    },

});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, userInfo) => {
    if (err) {
        return console.error('Error de autenticación:', err);
    }
    console.log('Conexión exitosa:', userInfo);
    console.log('Conexión exitosa:', conn);
    console.log("conntest", conn.accessToken);
    console.log("ct", conn.instanceUrl);
    console.log("User ID " + userInfo.id);
    console.log("Organization ID " + userInfo.organizationId);
});
