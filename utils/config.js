 //Here I have stored env files
 //If we want to use env file we are not directly dealing with yhe env so using config we are export and import where we need like server.js
 
 
 const dotenv = require('dotenv');
 dotenv.config();

 const MONGO_URI = process.env.MONGO_URI;
 const PORT = process.env.PORT;
 const SECRET_KEY = process.env.SECRET_KEY;

 module.exports ={
    MONGO_URI,
    PORT,
    SECRET_KEY
 }