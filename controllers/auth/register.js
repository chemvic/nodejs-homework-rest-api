const  User  = require('../../models/user');
const bcryptjs =require('bcryptjs');
const gravatar = require('gravatar');
const {nanoid} = require("nanoid");
const { ctrlWrapper, HttpError, sendEmail} = require('../../helpers');
const {BASE_URL} = process.env;

const register = async(req, res)=>{
    const {email, password}= req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Email in use" );        
    }
    const hashedPassword = await bcryptjs.hash(password,10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const result = await User.create({...req.body, password: hashedPassword, avatarURL, verificationToken});
    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify your email</a>`
    };
    await sendEmail(verifyEmail);

    res.status(201).json({"user": {
        "email": result.email,
        "subscription": result.subscription,
        "avatarURL": result.avatarURL
      }});

}
module.exports = { register: ctrlWrapper(register) };
