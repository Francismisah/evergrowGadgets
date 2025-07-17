const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1d' });
  },
  verifyToken: (token) => {
    return jwt.verify(token, env.JWT_SECRET);
  },
};