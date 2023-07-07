const fs = require('fs/promises');
const path = require('path');

const  User  = require('../../models/user');
const { ctrlWrapper, HttpError} = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async(req, res, next) =>{
     const {path: tempUpload, originalname} = req.file;
     const {_id} = req.user;
     const avatarName = `${_id}_${originalname}`;
    try {       
        const resultUpload = path.join(avatarsDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('public', 'avatars', avatarName); 
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({avatarURL});       
    } catch (error) {
       await fs.unlink(tempUpload);
       next(HttpError(401, 'Not authorized'));
    }

};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };