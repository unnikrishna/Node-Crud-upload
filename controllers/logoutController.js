const { log } = require("console");
const User = require("../modal/User");

const handleLogout = async (req, res) => {
  //Check cookie for refresh token
  const cookies = req.cookies;
  log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //find user with the refresh token
  const userFound = await User.findOne({ refreshToken }).exec();
  if (!userFound) {
    //For chrome secure must be set to true
    // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    return res.sendStatus(204);
  }
  //Delete token for user with the refresh token
  userFound.refreshToken = "";
  const result = await userFound.save();
  log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  res.sendStatus(204);
};
module.exports = {
  handleLogout,
};
