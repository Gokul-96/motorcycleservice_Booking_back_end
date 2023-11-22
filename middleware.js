const jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {
  req.user = {
    _id: 'someUserId',
  
  };
  console.log('Auth middleware is working!');
  console.log('User in middleware:', req.user);
  next();
};

module.exports = authMiddleware;






