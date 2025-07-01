// routes/userDataRoutes.js
const express = require('express');
const router = express.Router();
const UserData = require('../models/userDataModel');

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

// Submit survey data
router.post('/submit', async (req, res) => {
  const { userId, answers } = req.body;

  try {
    const existing = await UserData.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'Survey already submitted' });
    }

    const newData = new UserData({ userId, answers });
    await newData.save();
    res.json({ message: 'Survey saved successfully' });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ message: 'Failed to save survey' });
  }
});

module.exports = router;