const router = require('express').Router();

router.post('/', (req, res) => {
    res.send('Reply a Card');
});

module.exports = router;