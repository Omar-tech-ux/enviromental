const express = require('express');
const router = express.Router();

router.get('/solutions', (req, res) => {
    res.render('solutions');
});

module.exports = router;
