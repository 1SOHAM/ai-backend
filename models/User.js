const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  deviceId: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  onboardingDate: { type: Date, default: Date.now },
  permissions: {
    whatsappUpload: { type: Boolean, default: false },
    smsTracking: { type: Boolean, default: false },
    callRecording: { type: Boolean, default: false }
  },
  publicKey: { type: String },
  privateKeyHash: { type: String }
});

module.exports = mongoose.model('User', userSchema);
