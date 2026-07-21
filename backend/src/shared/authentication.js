const jwt = require("jsonwebtoken");

function tokenValidation(token, secret) {
  return (req, res, next) => {
    try {
      const tokenVerify = jwt.verify(token, secret);
    } catch (token) {
      if (!tokenVerify) {
        const error = new Error("Token expirado!");
        error.status = 401;
        throw error;
      } else if (tokenVerify) {
        next();
      }
    }
  };
}

module.exports = tokenValidation;
