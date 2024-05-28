const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { userExtractor } = require("../utils/middlewares");
const { HOST, PORT } = process.env;

function blogRefactoring(savedBlog) {
  const link = savedBlog.src.split(" ").join("%20");

  return {
    id: savedBlog.id,
    title: savedBlog.title,
    date: savedBlog.date,
    description: savedBlog.description,
    tags: savedBlog.tags,
    src: `${HOST}${PORT}/${link}`,
  };
}

userRouter.post("/", async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || password.length < 8 || !email) {
    return res.status(400).json({
      error:
        "email or password or other value malformed, please verify your inputs!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    ...req.body,
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
    const response = await User.findById(id).populate("blogs");

    res.send({
      blogs: response.blogs.map((r) => blogRefactoring(r)),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
