const jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {
  console.log('Auth middleware is working!');
  next();
};

module.exports = authMiddleware;






