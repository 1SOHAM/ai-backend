const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  surveyAnswers: {
    q1: String, q2: String, q3: String, q4: String, q5: String,
    q6: String, q7: String, q8: String, q9: String, q10: String
  },

  whatsappMessages: [
    {
      sender: String,
      message: String,
      timestamp: Date,
      hash: String
    }
  ],

  smsLogs: [
    {
      number: String,
      message: String,
      timestamp: Date,
      type: String,
      hash: String
    }
  ],

  callLogs: [
    {
      number: String,
      type: String,
      startTime: Date,
      endTime: Date,
      transcript: String,
      audioUrl: String,
      hash: String
    }
  ]
});

module.exports = mongoose.model('UserData', userDataSchema);
