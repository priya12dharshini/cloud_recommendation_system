// hformRoutes.js

const express = require('express');
const router = express.Router();
const hformController = require('../controllers/hformController');

router.post('/submitHealthcareForm', hformController.submitHealthcareForm);
router.get('/test', (req, res) => {
  res.send('Test route works!');
});

module.exports = router;

