const sendmail = require('sendmail')();

require('dotenv').config();
export const sendMail = async (mail, subject, message) => {
    sendmail({
        from: process.env.MAIL,
        to: mail,
        subject: subject,
        html: message,
    }, (err) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    })
}