const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { deviceId, publicKey, privateKey } = req.body;
    const privateKeyHash = await bcrypt.hash(privateKey, 10);

    const newUser = new User({ deviceId, publicKey, privateKeyHash });
    await newUser.save();

    res.status(201).json({ message: 'User created', userId: newUser._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updatePermissions = async (req, res) => {
  try {
    const { userId, permissions } = req.body;
    const user = await User.findByIdAndUpdate(userId, { permissions }, { new: true });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Permissions updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.signupUser = async (req, res) => {
  const { email, password, deviceId } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already used' });

    const newUser = new User({ email, password, deviceId });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', userId: newUser._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
