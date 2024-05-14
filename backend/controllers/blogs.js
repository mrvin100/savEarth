const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");

const { PORT } = process.env;

const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "./images/");
  },
  filename: (req, file, fn) => {
    fn(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, fn) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    fn(null, true);
  } else {
    fn(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

blogRouter.post("/", upload.single("file"), async (req, res) => {
  console.log(req.file, "trying to show image file");
  if (!req.file) return res.json({ error: "invalid file extension" });
  const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Suncday",
  };

  const { body } = req;
  console.log(body);
  if (!body.description) return res.json({ error: "an input missing!" });

  let date = new Date();
  date = `${
    days[date.getDay()]
  }, ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
  const tags = body.tags.split("#");

  const blog = new Blog({
    ...body,
    tags,
    date,
    image: req.file.path,
  });

  try {
    let savedBlog = await blog.save();
    const link = savedBlog.image.split(" ").join("%20");
    console.log(link);
    savedBlog = {
      header: savedBlog.header,
      date: savedBlog.date,
      description: savedBlog.description,
      tags: savedBlog.tags,
      image: `http://localhost:${PORT}/${link}`,
    };
    res.send(savedBlog).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

blogRouter.get("/", async (req, res) => {
  console.log("in get blog router");
  try {
    const allBlogs = await Blog.find();
    res.send(allBlogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = blogRouter;
