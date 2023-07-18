const {register} = require('./register');
const {login} = require('./login');
const {getCurrent} = require('./getCurrent');
const {logout} = require('./logout');
const {updateSubscriptionStatus} = require('./updateSubscriptionStatus');
const {updateAvatar} = require('./updateAvatar');
const {verifyEmail} = require('./verifyEmail');
const {resendVerifyEmail} = require('./resendVerifyEmail');


module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscriptionStatus,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail
}