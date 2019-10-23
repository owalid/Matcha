const jwt = require('jsonwebtoken')

export const veriftoken = (token) => {
  if (!token) {return false;}
  return jwt.verify(token, 'What Is Love', (err, decoded) => {
    return (err) ? false : true
  });
}
