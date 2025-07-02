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
router.post("/save-answer", async (req, res) => {
  const { userId, questionIndex, answer } = req.body;

  if (!userId || questionIndex === undefined || !answer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const key = `q${questionIndex + 1}`;

    // Build dynamic update object
    const update = {};
    update[`surveyAnswers.${key}`] = answer;

    const result = await UserData.findOneAndUpdate(
      { userId },
      { $set: update },
      { new: true, upsert: true }
    );

    res.json({ message: `Answer saved for ${key}` });

  } catch (err) {
    console.error("Error saving answer:", err);
    res.status(500).json({ error: "Failed to save answer" });
  }
});



module.exports = router;