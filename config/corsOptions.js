//CORS DISABLED
const { log, error } = require("console");
const allowedorigins = require("./allowedOrigins");


const corsOpt = {
  origin: (origin, callback) => {
    log("origin");
    log(origin);
    if (allowedorigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
module.exports = corsOpt; 