const jwtSecret = "Captain's_SecretKey"
const jwt = require('jsonwebtoken')

function generateToken(payload){
  return new Promise(
    (resolve, reject) => {
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: '1d'
        }, (error, token) => {
          if(error) reject(error);
          resolve(token);
        }
      )
    }
  )
}

function decodeToken(token) {
  return new Promise(
      (resolve, reject) => {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if(error) reject(error);
            resolve(decoded);
        });
      }
  );
}

exports.generateToken = generateToken
exports.decodeToken = decodeToken