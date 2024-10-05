const router = require('express').Router();
const axios = require('axios');
const { DISCORD_USER_ID, DISCORD_WEBHOOK_REPORT } = require('../../../index.js');

router.post('/', (req, res) => {
    let { id } = req.body;
    if(!DISCORD_USER_ID || !DISCORD_WEBHOOK_REPORT) return res.status(500).send('Error');

    //-> Send Discord Webhook:
    axios({
        method: 'POST',
        url: DISCORD_WEBHOOK_REPORT,
        headers: { 'Content-Type': 'application/json' },
        data: {
            content: `||<@${DISCORD_USER_ID}>||`,
            embeds: [{
                title: '🛑 New Report sent by an user!',
                color: 0x0039B3,
                fields: [
                    { name: '**Document ID:**', value: `➜ \`${id}\`` },
                ]
            }]
        }
    }).then((response) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(400);
    });

    
});

module.exports = router;