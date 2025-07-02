const jwt = require('../utils/jwt');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader); // Debug
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No valid auth header');
    return next();
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verifyToken(token);
    console.log('Decoded user:', decoded); // Debug
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    next();
  }
};