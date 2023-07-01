const { Contact } = require('../../models/contact');

const { ctrlWrapper } = require('../../helpers')

const listContacts = async (req, res) => { 
  const {_id: owner}=req.user;  
    const result =await Contact.find({owner},'-createdAt -updatedAt').populate('owner', 'name email');
    res.json(result);
  } 

module.exports = {listContacts: ctrlWrapper(listContacts)};