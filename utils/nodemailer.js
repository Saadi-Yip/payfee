// require('dotenv').config();
const nodemailer = require("nodemailer"); 
let transporter = nodemailer.createTransport({ 
    service:'gmail',
    auth:{
     user:"maryumsaleem@ytech.systems",
     pass: "epoxclmnazctguvb"
    },
    port:465,
    host:'smtp.gmail.com'
  })
 
  //Export Functions
module.exports = {transporter};