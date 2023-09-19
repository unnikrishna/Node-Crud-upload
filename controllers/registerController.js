const bcrypt = require("bcrypt");
const { log } = require("console");
const User = require("../modal/User");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });

  //Check for duplicate

  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) return res.status(409).json({ message: "User alread exist" });//Conflict

  try {
    const hashPass = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      password: hashPass,
    })
  
    res.status(201).json({ message: "New user created" });
  } catch (err) {
    res.status(500);
  }
};
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });

  //Check for duplicate

  const userFound = userDB.users.find((person) => person.username === user);
  if (!userFound)
    return res.status(201).json({ message: "User or password not match" });

  try {
    const match = await bcrypt.compare(pwd, userFound.password);

    if (match) return res.status(201).json({ user: userFound });
    return res.status(201).json({ message: "User or password not match" });
  } catch (err) {
    res.status(500);
  }
};
module.exports = {
  handleNewUser,
  handleLogin,
};
