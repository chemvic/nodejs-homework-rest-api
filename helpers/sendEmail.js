const nodemailer = require('nodemailer');
require('dotenv').config();
 const {META_PASSWORD} = process.env;

 const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure:true,
    auth: {
        user: 'chemvic@meta.ua',
        pass: META_PASSWORD
    }
 }

 const transport = nodemailer.createTransport(nodemailerConfig);

//  const email = {
//     to: 'chemvic79@yahoo.com',
//     from: 'chemvic@meta.ua',
//     subject: 'Test email',
//     html: '<p><strong>Test мыла</strong> с компа</p>'
//  }

 const sendEmail = async (data) => {
   const email = {...data, from: 'chemvic@meta.ua'}
   try {
     const info = await transport.sendMail(email);
 console.log('Email sended successfuly: ', info);
 console.log("Message sent: %s", info.messageId);
   } catch (error) {
      console.log(error.message)
   }
  
 };
 module.exports = sendEmail;


