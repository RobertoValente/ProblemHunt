const router = require('express').Router();
const axios = require('axios');
const { DISCORD_USER_ID, DISCORD_WEBHOOK_REPLY } = require('../../../index.js');

router.post('/', (req, res) => {
    let { identifier, replyEmail, replyMessage } = req.body;
    if(!identifier || !replyEmail || !replyMessage) return res.status(400).send('Missing Fields');
    if(!DISCORD_USER_ID || !DISCORD_WEBHOOK_REPLY) return res.status(500).send('Error');

    //-> Send Discord Webhook:
    axios({
        method: 'POST',
        url: DISCORD_WEBHOOK_REPLY,
        headers: { 'Content-Type': 'application/json' },
        data: {
            content: `||<@${DISCORD_USER_ID}>||`,
            embeds: [{
                title: '🔁 New Reply Message sent by an user!',
                color: 0x0039B3,
                fields: [
                    { name: '**Document ID:**', value: `➜ \`${identifier}\`` },
                    { name: '**Email:**', value: `➜ \`${replyEmail}\`` },
                    { name: '**Message:**', value: `➜ \`${replyMessage.replace(/[`$]/g, '\\$&')}\`` },
                ]
            }]
        }
    }).then((response) => {
        res.cookie('replyStatus', 'success', { maxAge: 10 * 1000 });
        return res.redirect('/');
    }).catch((error) => {
        res.cookie('replyStatus', 'error', { maxAge: 10 * 1000 });
        return res.redirect('/');
    });
});

module.exports = router;