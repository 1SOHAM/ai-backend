const express = require('express');
const router = express.Router();
const { createUser, updatePermissions, signupUser, loginUser } = require('../controllers/userController');

router.post('/create', createUser);             // device ID–based
router.put('/permissions', updatePermissions);  // permission update
router.post('/signup', signupUser);             // email + password
router.post('/login', loginUser);               // login endpoint

module.exports = router;
