const  Contact  = require('../../models/contact');

const { ctrlWrapper } = require('../../helpers')

const listContacts = async (req, res) => { 
  const {_id: owner}=req.user;  
  // пагинация
  const {page = 1, limit = 10} = req.query;
  // skip -величина из mongoose равная количеству элементов 
  // коллекции которые необходимо пропустить при запросе
  const skip = (page-1)*limit;
  
    const result =await Contact.find({owner},'-createdAt -updatedAt', {skip, limit}).populate('owner', 'name email');
    res.json(result);
  } 

module.exports = {listContacts: ctrlWrapper(listContacts)};