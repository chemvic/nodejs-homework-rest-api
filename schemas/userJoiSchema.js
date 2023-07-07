const Joi = require('joi');

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;


const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string()
})
const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valueOf("starter", "pro", "business").required()
})
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
})

module.exports = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema
};