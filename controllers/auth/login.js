const  User  = require('../../models/user/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const { ctrlWrapper, HttpError} = require('../../helpers');
const {SECRET_KEY}=process.env;


const login = async(req,res) => {
    const {email, password}=req.body;
    const user = await User.findOne({email});
   
    if (!user) {
        throw HttpError(401, 'Email or password is incorrect')
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is incorrect');
    }
    const payload ={
        id:user._id,
    }
    const token =jwt.sign(payload, SECRET_KEY, {expiresIn:'23h'});
     // запись в User token для реализации logout
     await User.findByIdAndUpdate(user._id,{token});

    res.status(200).json({token});
}

module.exports = { login: ctrlWrapper(login) };