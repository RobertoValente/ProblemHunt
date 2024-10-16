const router = require('express').Router();
const path = require('path');
const { DOMAIN_NAME, DOMAIN_URL, URL_DISCORD, URL_X } = require('../index.js');
const { addProblemCard, listAllProblemsCard } = require('../functions/appwrite.js');

router.get('/', (req, res) => {
    //-> Get the Language:
    let language = req.acceptsLanguages('en-US', 'pt-PT', 'pt-BR');
    if(language === 'pt-BR') language = 'pt-PT';
    if(!language) language = 'en-US';
    const lngSource = require(path.join(__dirname + `./../translations/${language}.json`));

    //-> Get tempCookies then Delete Cookies:
    let tempAlreadyVisited;
    let tempContactStatus = req.cookies.contactStatus; res.clearCookie('contactStatus');
    let tempCreateProblemStatus = req.cookies.createProblemStatus; res.clearCookie('createProblemStatus');
    let tempReplyStatus = req.cookies.replyStatus; res.clearCookie('replyStatus');
    tempAlreadyVisited = (req.cookies.alreadyVisited === "true") ? tempAlreadyVisited = "true" : tempAlreadyVisited = "false";
    if(tempAlreadyVisited === "false") res.cookie('alreadyVisited', "true", { maxAge: 1000 * 60 * 60 * 24 * 365 });

    //-> Render the Home Page:
    return res.render('home', {
        siteInfo: { name: DOMAIN_NAME, url: DOMAIN_URL, urlDiscord: URL_DISCORD, urlX: URL_X },
        lng: lngSource,
        cookies: {
            contactStatus: tempContactStatus,
            createProblemStatus: tempCreateProblemStatus,
            replyStatus: tempReplyStatus,
            alreadyVisited: tempAlreadyVisited,
        }
    });
});

module.exports = router;