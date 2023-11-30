const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const SECRET_KEY = config.SECRET_KEY;

const authMiddleware = {
verifyToken: (req, res, next) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({message:'Authenticaion failed'});
  }
  try{
    const decodedToken =jwt.verify(token,SECRET_KEY);
    req.userId=decodedToken.userId;
    next();
  }catch (error){
    console.error('Error verifying token', error);
    return res.status(401).json({message:'Authentication failed'});
  }
}
};

module.exports = authMiddleware;






