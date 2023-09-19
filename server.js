require("dotenv").config();
const { log, error } = require("console");
const exp = require("constants");
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3500;
const corsOpt = require("./config/corsOptions");
const verifyJwt = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentails = require("./middleware/credentials");
const { default: mongoose } = require("mongoose");
const connectDB = require("./config/dbConn");

//Connect to mongo DB
connectDB();

//middleware
// custom middleware
app.use(logger);

app.use(credentails);

app.use(cors(corsOpt));
//urlencode form data
app.use(express.urlencoded({ extended: false }));
//built in middleware for json
app.use(express.json());
//built in middleware for cookies
app.use(cookieParser());
//serve static file
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/register", require("./routes/api/register"));
app.use("/login", require("./routes/api/login"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

app.use(verifyJwt);
app.use("/employees", require("./routes/api/employees"));
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("====================================");
  console.log("CONNECTED TO DB");
  console.log("====================================");
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
