const express = require('express');
const router = express.Router();
const hformController = require('../controllers/hformController');

router.post('/submitHealthcareForm', hformController.submitHealthcareForm);

module.exports = router;

