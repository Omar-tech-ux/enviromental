const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/admin', async (req, res) => {
    try {
        const messages = await db.ContactForm.findAll();
        res.render('admin', { messages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
