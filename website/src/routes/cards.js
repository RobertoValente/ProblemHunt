const router = require('express').Router();
const path = require('path');
const { addProblemCard, listAllProblemsCard } = require('../functions/appwrite.js');

router.get('/', async(req, res) => {
    //-> Get the Language:
    let clientLanguage = req.acceptsLanguages('en-US', 'pt-PT', 'pt-BR');
    if(clientLanguage === 'pt-BR') clientLanguage = 'pt-PT';
    if(!clientLanguage) clientLanguage = 'en-US';
    const lngSource = require(path.join(__dirname + `./../translations/${clientLanguage}.json`));

    //-> Get the Language from the Query:
    let lang = req.query.lang || "0";
    if(lang !== 'en-US' && lang !== 'pt-PT' && lang !== 'other') lang = '0';

    //-> Execute the Query/Request:
    listAllProblemsCard(lang).then((result) => {
        let { status, response } = result;

        //-> If the Request was Successful (and return 0 results):
        if(response.total === 0) return res.send(lngSource.msgNoDataFound);

        //-> If the Request was Successful:
        if(status === 1) return res.render('card', {
            data: response.documents,
            lng: lngSource,
        });

        //-> If the Request was Unsuccessful:
        return res.send(lngSource.msgGeneralError);
    });
});

router.post('/', async(req, res) => {    
    //-> Get Data from the Form:
    let { createLanguage, createProblem, createEmail } = req.body;

    //-> Execute the Query/Request:
    addProblemCard(createProblem, createEmail = null, createLanguage).then((result) => {
        let { status, response } = result;

        //-> If the Request was Successful:
        if(status === 1) {
            res.cookie('createProblemStatus', 'success', { maxAge: 10 * 1000 });
            return res.redirect('/');
        }

        //-> If the Request was Unsuccessful:
        res.cookie('createProblemStatus', 'error', { maxAge: 10 * 1000 });
        return res.redirect('/');
    });
});

module.exports = router;