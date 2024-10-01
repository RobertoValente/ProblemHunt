const router = require('express').Router();
const axios = require('axios');
const { DISCORD_USER_ID, DISCORD_WEBHOOK_CONTACT } = require('../index.js');

router.post('/', (req, res) => {
    let { contactCategory, contactEmail, contactMessage } = req.body;
    if(!DISCORD_USER_ID || !DISCORD_WEBHOOK_CONTACT) return res.status(500).send('Error');

    //-> Send Discord Webhook:
    axios({
        method: 'POST',
        url: DISCORD_WEBHOOK_CONTACT,
        headers: { 'Content-Type': 'application/json' },
        data: {
            content: `||<@${DISCORD_USER_ID}>||`,
            embeds: [{
                title: '📬 New Message sent by an user!',
                color: 0x0039B3,
                fields: [
                    { name: '**Category:**', value: `➜ \`${contactCategory}\`` },
                    { name: '**Email:**', value: `➜ \`${contactEmail}\`` },
                    { name: '**Message:**', value: `➜ \`${contactMessage}\`` },
                ]
            }]
        }
    }).then((response) => {
        res.cookie('contactStatus', 'success', { maxAge: 10 * 1000 });
        return res.redirect('/');
    }).catch((error) => {
        res.cookie('contactStatus', 'error', { maxAge: 10 * 1000 });
        return res.redirect('/');
    });
});

module.exports = router;