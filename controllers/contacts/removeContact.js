const  Contact  = require('../../models/contact');

const { ctrlWrapper, HttpError } = require('../../helpers')

const removeContact = async (req, res) => {
    const {id}=req.params;
    const result =await Contact.findByIdAndRemove(id);
    if(!result){
      throw HttpError(404, "Not found");
    }
    res.status(200).json({message: "contact deleted"})
  }  

module.exports = {removeContact: ctrlWrapper(removeContact)};