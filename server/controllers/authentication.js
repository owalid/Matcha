const jwt = require('jsonwebtoken');

require('dotenv').config();

export const tokenForUser = async (User) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: User.id_users, name: User.first_name, email: User.email, iat: timestamp }, process.env.SECRET_JWT);
}

export const tokenforOAuth = (fbUser) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: fbUser.id, name: fbUser.first_name, email: fbUser.email, iat: timestamp }, process.env.SECRET_JWT);
}

export const veriftoken = (token) => {
  return jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    return (err) ? false : true
  });
}
