const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.post('/submitForm', mediaController.submitForm); // Make sure this route is defined


module.exports = router; 