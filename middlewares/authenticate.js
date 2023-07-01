const jwt =require('jsonwebtoken');
const {HttpError} = require('../helpers');
const User = require('../models/user/user');
const {SECRET_KEY} = process.env;

const authenticate = async (req, res,next) => {

const {authorization =""} =req.headers;
const [bearer, token] = authorization.split(" ");
console.log(token);
if(bearer!=="Bearer"){
    next(HttpError(401));
};
try {
    console.log("до візова jwt.verify");
    const {id} =jwt.verify(token, SECRET_KEY);
  console.log("после візова jwt.verify");
    const user = await User.findById(id);
    console.log(`user.id ${user.id}`);
    if(!user){
        next(HttpError(401));
    };
    req.user = user;
    next();

} catch  {
    next(HttpError(401));
}

}

module.exports = authenticate;