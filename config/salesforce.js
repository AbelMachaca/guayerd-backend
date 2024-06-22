const jsforce = require('jsforce');
require('dotenv').config();

const conn = new jsforce.Connection({
    oauth2: {
        clientId: process.env.SF_CLIENT_ID,
        clientSecret: process.env.SF_CLIENT_SECRET,
        redirectUri: process.env.SF_REDIRECT_URI
    },
    loginUrl: process.env.SF_LOGIN_URL
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, userInfo) => {
    if (err) {
        return console.error(err);
    }
    console.log('Salesforce connected:', userInfo);
});

module.exports = conn;

