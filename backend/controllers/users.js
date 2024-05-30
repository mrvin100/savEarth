const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { userExtractor } = require("../utils/middlewares");
const multer = require("multer");

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

function linkRefactoring(link) {
  return `${HOST}${PORT}/${link}`;
}

const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "./images/profiles");
  },
  filename: (req, file, fn) => {
    fn(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

userRouter.post("/", upload.single("userFile"), async (req, res, next) => {
  const { password, username, email } = req.body;
  const image = req.file && req.file.path;
  const { body } = req;
  console.log(body);
  if (
    !password ||
    password.length < 8 ||
    !email ||
    !username ||
    !body.profession ||
    !body.number
  ) {
    return res.status(400).json({
      error:
        "email or password or other value malformed, please verify your inputs!",
    });
  }
  if (image) {
    body.src = image;
  }

  console.log(body);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    ...body,
    username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ ...savedUser, src: linkRefactoring(savedUser.src) }).status(200);
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
      collections: response.collections,
      profession: response.profession,
      username: response.username,
      src: linkRefactoring(response.src),
    });
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  "/:id",
  upload.single("updateUserImage"),
  userExtractor,
  async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    if (!body.username || !body.profession || !body.number || !body.email)
      return res.status(402).send({ error: "some inputs are missing" });

    const image = req.file && req.file.path;

    if (image) body.src = image;

    try {
      const newUser = {
        ...body,
        email: body.email,
        profession: body.profession,
        number: body.number,
        username: body.username,
      };
      console.log("new user", newUser);
      const updatedUser = await User.findByIdAndUpdate(id, newUser, {
        new: true,
      });
      delete updatedUser.password;
      delete updatedUser.blogs;
      res.send({
        email: updatedUser.email,
        username: updatedUser.username,
        src: linkRefactoring(updatedUser.src),
        profession: updatedUser.profession,
        number: updatedUser.number,
        id: updatedUser.id,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userRouter;
