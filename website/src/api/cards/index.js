const router = require('express').Router();
const path = require('path');
const { DOMAIN_URL } = require('../../index.js');
const { addProblemCard, listAllProblemsCard } = require('../../functions/appwrite.js');

router.get('/', async(req, res) => {
    //-> Get the Language:
    let language = req.acceptsLanguages('en-US', 'pt-PT', 'pt-BR');
    if(language === 'pt-BR') language = 'pt-PT';
    if(!language) language = 'en-US';
    const lngSource = require(path.join(__dirname + `./../../translations/${language}.json`));

    listAllProblemsCard().then((result) => {
        let { status, response } = result;

        //-> If the Request was Successful:
        if(status === 1) return res.render('problemCards', {
            data: response.documents,
            lng: lngSource,
        });

        //-> If the Request was Unsuccessful:
        return res.send(lngSource.msgGeneralError);
    });
    
});

module.exports = router;