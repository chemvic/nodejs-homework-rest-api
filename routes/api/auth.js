const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const validateBody = require('../../middlewares/validateBody');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/upload');
const schemas= require('../../schemas/userJoiSchema');


router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.get('/verify/:verificationToken', ctrl.verifyEmail);
router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch('/', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscriptionStatus);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
