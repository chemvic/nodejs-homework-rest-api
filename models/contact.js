const {Schema, model} = require('mongoose');

const  handleMongooseError = require('../middlewares/handleMongooseError');

const contactSchema =  Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      }
}, {versionKey: false, timestamps: true});

contactSchema.post('save', handleMongooseError)

module.exports = model('contact', contactSchema);