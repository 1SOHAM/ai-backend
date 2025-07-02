// routes/userDataRoutes.js
const express = require('express');
const router = express.Router();
const UserData = require('../models/UserData');


// Check if survey data already exists for user
router.get('/check/:userId', async (req, res) => {
  try {
    const data = await UserData.findOne({ userId: req.params.userId });
    res.json({ filled: !!data });
  } catch (error) {
    console.error('Error checking user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// userDataRoutes.js
router.post('/save-answer', async (req, res) => {
  const { userId, questionIndex, answer } = req.body;

  try {
    let userData = await UserData.findOne({ userId });

    if (!userData) {
      userData = new UserData({ userId, answers: {} });
    }

    userData.answers[questionIndex] = answer;
    await userData.save();

    res.json({ message: `Answer ${questionIndex + 1} saved` });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({ error: 'Failed to save answer' });
  }
});

module.exports = router;