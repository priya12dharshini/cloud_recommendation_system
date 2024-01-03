
const express = require('express');
const router = express.Router();
const FinController = require('../controllers/finController');

router.post('/submitFinForm', FinController.submitFinForm); // Make sure this route is defined

router.get('/test', (req, res) => {
  res.send('Test route works!');
});

module.exports = router; 