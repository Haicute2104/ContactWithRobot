const nodeMailer = require('nodemailer');

const sendMail = async ({email, subject, html}) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.email.com',
    service: 'Gmail',
    auth:{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const message = {
    from: "Tiệm bánh xinh QBBy",
    to: email,
    subject: subject,
    html: html
  };

  const result = await transporter.sendMail(message);

  return result;
}
module.exports = sendMail;
