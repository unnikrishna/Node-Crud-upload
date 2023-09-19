const allowedorigins = require("../config/allowedOrigins");

const credentails = (req, res, next) => {
  const origin = req.headers.origins;
  if (allowedorigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
module.exports = credentails;