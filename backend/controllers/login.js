const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });
  console.log(user);
  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(404).json({ error: "wrong credentials" });
  }

  const userToken = {
    email,
    id: user.id,
  };
  const token = jwt.sign(userToken, process.env.SECRET);

  try {
    res.status(200).send({ token, email, id: user.id });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
