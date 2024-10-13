const { NODE_ENV } = require('../../start.js');
require('dotenv').config({ path: `./.env.${NODE_ENV}` });
const { sdk, Client, Databases } = require('node-appwrite');
const express = require('express');
const app = express();
const { rateLimit } = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const path = require('path');

//-> Appwrite SDK:
const client = new Client();
const databases = new Databases(client);
client.setEndpoint(process.env.APPWRITE_ENDPOINT)
client.setProject(process.env.APPWRITE_PROJECT_ID)
client.setKey(process.env.APPWRITE_API_KEY);
if(process.env.NODE_ENV === 'development') { client.setSelfSigned(); }

//-> Exporting Env Variables:
module.exports = {
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    DOMAIN_URL: process.env.DOMAIN_URL,
    NODE_ENV: NODE_ENV,
    WEBSITE_PORT: process.env.WEBSITE_PORT,
    APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
    APPWRITE_COLLECTION_ID: process.env.APPWRITE_COLLECTION_ID,
    URL_DISCORD: process.env.URL_DISCORD,
    URL_X: process.env.URL_X,
    DISCORD_USER_ID: process.env.DISCORD_USER_ID,
    DISCORD_WEBHOOK_CONTACT: process.env.DISCORD_WEBHOOK_CONTACT,
    DISCORD_WEBHOOK_REPORT: process.env.DISCORD_WEBHOOK_REPORT,
    DISCORD_WEBHOOK_REPLY: process.env.DISCORD_WEBHOOK_REPLY,
    appwriteClient: client,
    appwriteDatabases: databases,
}

//-> Configure Express (Media Routes):
app.use('/css', express.static(path.join(__dirname + '/styles/')));
app.use('/images', express.static(path.join(__dirname + '/images/')));
app.use('/scripts', express.static(path.join(__dirname + '/scripts/')));

//-> Configure Express (View Engine):
app.set('view engine', 'ejs');
app.set('views', [ path.join(__dirname, '/pages'), path.join(__dirname, '/components') ]);

//-> Configure Express (Security):
app.disable('x-powered-by');
app.use(rateLimit({ windowMs: 5 * 60 * 1000, max: 80, standardHeaders: true, legacyHeaders: false }));
//-> Solve the issue with the CSP (Content Security Policy) with Modals (openModal();):
/*app.use(helmet.contentSecurityPolicy({ directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
        "'self'", "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js",
    ],
    imgSrc: ["'self'", "blob:", "data:"],
}}));*/

//-> Configure Express (Cookie):
app.use(cookieParser(process.env.COOKIE_SECRET));

//-> Configure Express (Others)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname + '/images/favicon.png')));

//-> Routes Creation:
app.use('/cards/like', require('./routes/cards/like/root.js'));
app.use('/cards/reply', require('./routes/cards/reply/root.js'));
app.use('/cards/report', require('./routes/cards/report/root.js'));
app.use('/cards', require('./routes/cards/root.js'));
app.use('/contact', require('./routes/contact.js'));
app.use('/', require('./routes/root.js'));
app.use((req, res, next) => { return res.status(404).send('404: Page not Found'); })
app.use((err, req, res, next) => { console.log(err); return res.status(500).send('500: Internal Server Error'); })

//-> Start Server:
let port = process.env.WEBSITE_PORT || 3000;
app.listen(port, () => {
    console.log('-> Running on http://localhost:' + port);
});
