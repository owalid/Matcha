require('dotenv').config();
const client = require('twilio')(process.env.API_SMS_SID, process.env.API_SMS_TOKEN);
export const sendSms = async (number, hash) => {
  return (await client.messages
    .create({
      body: `
       Your Matcha verification code : ${hash}`,
      from: '+33757901185',
      to: number
    })
    .then(message => {message; return true})
    .catch(e => {return false}));
}