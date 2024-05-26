const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { userExtractor } = require("../utils/middlewares");

userRouter.post("/", async (req, res, next) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser).status(200);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  try {
    const res = await User.findById(id);
    res.send(res);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
