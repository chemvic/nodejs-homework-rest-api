const fs = require('fs/promises');
const path = require('path');
const Jimp = require("jimp");
const  User  = require('../../models/user');
const { ctrlWrapper, HttpError} = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async(req, res, next) =>{
     const {path: tempUpload, originalname} = req.file;
     try {
     const image = await Jimp.read(tempUpload);
     await image
     .autocrop()
     .cover(
        250,250,Jimp.HORIZONTAL_ALIGN_CENTER ||Jimp.VERTICAL_ALIGN_MIDDLE
     )
      .writeAsync(tempUpload);
     } catch (error) {
        console.error(error);
     }

     const {_id} = req.user;
     const avatarName = `${_id}_${originalname}`;
    try {  
      if(tempUpload ===""){return}; 
        const resultUpload = path.join(avatarsDir, avatarName);
        const prevAvatarURL = await User.findById(_id).select('avatarURL');
        if(prevAvatarURL.avatarURL){
            const prevAvatarPath = path.join(__dirname,'../../', prevAvatarURL.avatarURL);
            console.log("resultUpload: ",resultUpload);
            console.log("prevAvatarPath: ",prevAvatarPath);

            fs.unlink(prevAvatarPath,(err)=>{
                if(err) console.log(err);
            });
        }
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