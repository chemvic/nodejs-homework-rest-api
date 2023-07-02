const express = require('express');
const ctrl = require('../../controllers/contacts');
const validateBody = require('../../middlewares/validateBody');
const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');
const schemas  = require('../../schemas/contactJoiSchema');

const router = express.Router();


router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

module.exports = router;
