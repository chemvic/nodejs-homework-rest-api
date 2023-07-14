const {Schema, model} = require('mongoose');

const  handleMongooseError  = require('../middlewares/handleMongooseError');

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;


const userSchema = new Schema({
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
    email:{
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        uniqe: true
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength:6,
    },
    // сохранение token чтобы произвести logout
    token:{
        type: String,
        default: null
    },
    avatarURL:{
       type: String,
       required: true
    }
},{versionKey:false, timestamps:true});

userSchema.post('save', handleMongooseError);

module.exports = model('user', userSchema);

