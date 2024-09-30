const router = require('express').Router();
const path = require('path');
const { DOMAIN_NAME, DOMAIN_URL } = require('../index.js');
const { addProblemCard, listAllProblemsCard } = require('../functions/appwrite.js');

router.get('/', (req, res) => {
    //-> Get the Language:
    let language = req.acceptsLanguages('en-US', 'pt-PT', 'pt-BR');
    if(language === 'pt-BR') language = 'pt-PT';
    if(!language) language = 'en-US';
    const lngSource = require(path.join(__dirname + `./../translations/${language}.json`));

    //-> Render the Home Page:
    return res.render('home', {
        siteInfo: { name: DOMAIN_NAME, url: DOMAIN_URL },
        lng: lngSource,
    });
});

module.exports = router;