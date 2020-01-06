let jwt = require('jsonwebtoken');
const appconstants = require('../config/appconstants');

module.exports.checkToken = (req, res, next) => {

    let token = req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    
    if (token) {
        jwt.verify(token, appconstants.secret, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
    };
    