const nodemailer = require('nodemailer');
require('dotenv').config()

function sendEmail(email,value){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from : process.env.USER,
        to : email,
        subject: 'RECEIVE THE BC YOU HAVE MINED',
        text : '\ Congratulation to you that you have mined successfully ' + value.toString() + ' BC\n \
               Thank you very much that spent time to mine the coin.\n \
               This is your reward for your effort.\n \
               If you have any questions, please enter <button>Click me</button> https://vodanh.glitch.me and send your question to that website.\n \
               Thank you very much,\n \
               Steven.'
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.error(err);
        }else{
            console.log('Email was sent: '+ info.response)
        }
    })
}
module.exports = sendEmail