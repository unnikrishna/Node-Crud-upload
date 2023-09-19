const jwt = require("jsonwebtoken");
const { log } = require("console");
const bcrypt = require("bcrypt");
const User = require("../modal/User");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });

  const userFound = await User.findOne({ username: user }).exec();;
  if (!userFound)
    return res.status(201).json({ message: "User or password not match" });
  try {
    const match = await bcrypt.compare(pwd, userFound.password);
    if (match) {
      const roles = Object.values(userFound.roles);
      //Create JWT
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

      const refreshToken = jwt.sign(
        { username: userFound.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

     

      //Saving JWT token with current user
      userFound.refreshToken = refreshToken;
      const result = await userFound.save()
      log(result);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ accessToken });
    } else {
      res.status(201).json({ message: "User or password not match" });
    }
  } catch (err) {
    log("err", err);
    res.status(500);
  }
};
module.exports = {
  handleLogin,
};
