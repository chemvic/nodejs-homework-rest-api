const {addContact} = require('./addContact');
const {getContactById} = require('./getContactById');
const {listContacts} = require('./listContacts');
const {updateContact} = require('./updateContact');
const {updateStatusContact} = require('./updateStatusContact');
const {removeContact} = require('./removeContact');

module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    updateStatusContact,
    removeContact
  }