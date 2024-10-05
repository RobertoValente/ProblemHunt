const router = require('express').Router();
const { likeProblemCard } = require('../../../functions/appwrite.js');

router.post('/', (req, res) => {
    let { id } = req.body;

    likeProblemCard(id).then((result) => {
        let { status, response } = result;

        if(status === 1) return res.sendStatus(200);
        return res.sendStatus(400);
    });
});

module.exports = router;