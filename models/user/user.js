const {Schema, model} = require('mongoose');

const  handleMongooseError  = require('../../middlewares/handleMongooseError');

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;


const userSchema = new Schema({
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
    },
    // сохранение token чтобы произвести logout
    token:{
        type: String,
        default:''
    }
},{versionKey:false, timestamps:true});

userSchema.post('save', handleMongooseError);



module.exports = model("user", userSchema);

// const User = model('user', userSchema);
// module.exports = User;
