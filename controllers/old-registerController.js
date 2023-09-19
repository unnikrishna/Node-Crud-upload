const userDB = {
  users: require("../modal/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const { log } = require("console");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });

  //Check for duplicate

  const duplicate = userDB.users.find((person) => person.username === user);

  if (duplicate) return res.status(500).json({ message: "User alread exist" });

  try {
    const hashPass = await bcrypt.hash(pwd, 10);

    const newUser = {
      username: user,
      roles: { User: 7170 },
      password: hashPass,
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "modal", "user.json"),
      JSON.stringify(userDB.users)
    );

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
