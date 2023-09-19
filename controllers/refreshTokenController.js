const { log } = require("console");
const jwt = require("jsonwebtoken");
const User = require("../modal/User");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  log('cookies', cookies);
  if (!cookies?.jwt) return res.sendStatus(401); //Unauthorise

  const refreshToken = cookies.jwt;
  const userFound = await User.findOne({ refreshToken }).exec();
  if (!userFound) return res.sendStatus(403); //forbidded
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || userFound.username !== decoded.username)
      return res.sendStatus(403);

    const roles = Object.values(userFound.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: userFound.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};
module.exports = {
  handleRefreshToken,
};
