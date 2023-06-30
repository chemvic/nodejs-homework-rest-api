const {Schema, model} = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../middlewares');

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;


const userSchema = Schema({
    name:{
        type: String,
        required:true,        
    },
    email:{
        type: String,
        required:true,
        match: emailRegexp,
        uniqe: true
    },
    password:{
        type: String,
        required:true,
        minLength:6,
    }
},{versionKey:false, timestamps:true});

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
})
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
})

const schemas = {
    registerSchema,
    loginSchema
}

module.exports = {
    User,
    schemas
}