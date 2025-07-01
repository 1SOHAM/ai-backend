const express = require('express');
const router = express.Router();
const { saveSurvey } = require('../controllers/userDataController');

// Route to save behavioral survey answers
router.post('/survey', saveSurvey);

module.exports = router;
