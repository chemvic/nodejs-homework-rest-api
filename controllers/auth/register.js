const  User  = require('../../models/user');
const bcrypt =require('bcrypt');
const gravatar = require('gravatar');
const { ctrlWrapper, HttpError} = require('../../helpers');

const register = async(req, res)=>{
    const {email, password}= req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Email in use" );        
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({...req.body, password: hashedPassword, avatarURL});
    res.status(201).json({"user": {
        "email": result.email,
        "subscription": result.subscription,
        "avatarURL": result.avatarURL
      }});

}
module.exports = { register: ctrlWrapper(register) };
