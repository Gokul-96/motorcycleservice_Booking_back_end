const jwt = require('jsonwebtoken');
const config = require('../utils/config');



const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
      console.log("token before split:",token)
      // Extract the token without the "Bearer " prefix
      const extractedToken = token.split(' ')[1]; // Split at the space and get the second part
      console.log("extractedtoken:",extractedToken)
      const decodedToken = jwt.verify(extractedToken, config.SECRET_KEY);
    
      req.user = decodedToken; // Set req.user to the decoded token
      next();
    } catch (error) {
      console.error('Error verifying token:', error);

      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Authentication failed: Token expired' });
      }

      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
  },
};

module.exports = authMiddleware;