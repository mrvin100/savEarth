const blogRouter = require("express").Router();
const Blog = require("../models/blog");

const multer = require("multer");
const { userExtractor } = require("../utils/middlewares");

const { PORT, HOST } = process.env;

function blogRefactoring(savedBlog) {
  const link = savedBlog.src.split(" ").join("%20");

  return {
    id: savedBlog.id,
    title: savedBlog.title,
    date: savedBlog.date,
    description: savedBlog.description,
    tags: savedBlog.tags,
    src: `${HOST}${PORT}/${link}`,
    user: savedBlog.user,
  };
}

const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "./images/blogs");
  },
  filename: (req, file, fn) => {
    fn(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, fn) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    fn(null, true);
  } else {
    fn((error) => error.message, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

blogRouter.post(
  "/",
  userExtractor,
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file)
      return res.status(500).send({ error: "invalid file extension" });
    const user = req.user;
    const days = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      0: "Sunday",
    };

    const { body } = req;
    console.log(body);
    if (!body.description)
      return res.status(500).send({ error: "an input missing!" });

    let date = new Date();

    date = `${
      days[date.getUTCDay()]
    }, ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;

    const tags = body.tags.split("#");

    const blog = new Blog({
      ...body,
      tags,
      date,
      src: req.file.path,
      user: user.id,
    });

    try {
      let savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog);
      await user.save();

      res.send(blogRefactoring(savedBlog)).status(200);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.get("/", async (req, res, next) => {
  console.log("in get blog router");
  try {
    const allBlogs = await Blog.find().populate("user", {
      email: 1,
      profession: 1,
      number: 1,
      blogs: 1,
    });
    let refactoredBlogs = [];
    allBlogs.map((b) => {
      refactoredBlogs = refactoredBlogs.concat(blogRefactoring(b));
    });

    res.send(refactoredBlogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:id", userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user");
    res.send(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/", userExtractor, async (req, res, next) => {
  let { body } = req;
  body = { ...body, tags: body.tags.split("#") };
  const id = body.id;
  try {
    const blog = await Blog.findById(id);
    if (req.user.id.toString() === blog.user.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
      res.send(blogRefactoring(updatedBlog));
    }
    res.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const blog = await Blog.findById(id);
    console.log(user.id, blog.user);
    user.id.toString() === blog.user.toString() &&
      (await Blog.findByIdAndDelete(id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
