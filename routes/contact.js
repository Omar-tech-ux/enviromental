const express = require('express');
const router = express.Router();
const db = require('../models');

// Render the contact form
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Handle form submission
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await db.ContactForm.create({ name, email, message });
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error sending your message. Please try again later.');
    }
});

module.exports = router;
