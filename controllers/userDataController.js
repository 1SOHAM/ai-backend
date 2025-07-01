const UserData = require('../models/UserData');
const { encrypt } = require('../utils/encrypt');
const { hashData } = require('../utils/hash');

exports.saveSurvey = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    const encryptedAnswers = {};
    for (const key in answers) {
      encryptedAnswers[key] = encrypt(answers[key]);
    }

    const hash = hashData(JSON.stringify(answers));
    const userData = await UserData.findOneAndUpdate(
      { userId },
      { $set: { surveyAnswers: encryptedAnswers } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Survey saved', hash });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
