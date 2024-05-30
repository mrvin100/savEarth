const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res, next) => {
  const { email, password, username } = req.body;
  console.log(email, password, username);

  const user = await User.findOne({ email });
  console.log(user);

  if (user.username !== username) {
    return res.status(401).send({
      error: "conflicting user credentials please enter right values",
    });
  }

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(404).json({ error: "wrong credentials" });
  }

  const userToken = {
    email,
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(userToken, process.env.SECRET);

  try {
    res
      .status(200)
      .send({ token, email, username: user.username, id: user.id });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
