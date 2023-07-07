const  User  = require('../../models/user');
const bcrypt =require('bcrypt');
const { ctrlWrapper, HttpError} = require('../../helpers');

const register = async(req, res)=>{
    const {email, password}= req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Email in use" );        
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await User.create({...req.body, password: hashedPassword});
    res.status(201).json({"user": {
        "email": result.email,
        "subscription": result.subscription
      }});

}
module.exports = { register: ctrlWrapper(register) };
