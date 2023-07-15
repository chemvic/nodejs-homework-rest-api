const  User  = require('../../models/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const { ctrlWrapper, HttpError} = require('../../helpers');



const login = async(req,res) => {
    const {email, password}=req.body;
    const user = await User.findOne({email});
   const {SECRET_KEY}=process.env;
    if (!user) {
        throw HttpError(401, 'Email or password is wrong')
    }
    if(!user.verify){
      throw HttpError(401, 'Email is not verified') ;
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong');
    }
    const {subscription} = user;
    const payload ={
        id:user._id,
    }
    const token =jwt.sign(payload, SECRET_KEY, {expiresIn:'23h'});
     // запись в User token для реализации logout
     await User.findByIdAndUpdate(user._id,{token});

    res.status(200).json({"token": token,
    "user": {
      "email": email,
      "subscription": subscription}});
}

module.exports = { login: ctrlWrapper(login) };