const  Contact  = require('../../models/contact');

const { ctrlWrapper } = require('../../helpers')

const listContacts = async (req, res) => { 
  const {_id: owner}=req.user; 

  // пагинация
  const {page = 1, limit = 10} = req.query;
  // skip -величина из mongoose равная количеству элементов 
  // коллекции которые необходимо пропустить при запросе
  const skip = (page-1)*limit;

  // фильтрация контактов по полю favorite
  const {favorite}=req.query;
  const filter= {owner};
  if(favorite){
    filter.favorite =favorite;
  }
    const result =await Contact.find(filter,'-createdAt -updatedAt', {skip, limit}).populate('owner', 'name email');
    res.json(result);
  } 
module.exports = {listContacts: ctrlWrapper(listContacts)};