const {Schema, model} = require('mongoose');

const { handleMongooseError } = require('../../middlewares');

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
    }
},{versionKey:false, timestamps:true});

userSchema.post('save', handleMongooseError);

// const User = model('user', userSchema);

module.exports = model("users", userSchema);

// module.exports = {
//     User,
// }