const  User  = require('../../models/user');

const { ctrlWrapper, HttpError } = require('../../helpers')

const updateSubscriptionStatus = async (req, res) => {       
    const {_id} = req.user;
    const result =await User.findByIdAndUpdate(_id, req.body, {new: true});
    if(!result){
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
  } 

module.exports = {updateSubscriptionStatus: ctrlWrapper(updateSubscriptionStatus)};