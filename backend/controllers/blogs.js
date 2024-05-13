const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.post("/", async (req, res) => {
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
  let date = new Date();
  date = `${
    days[date.getDay()]
  }, ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
  const tags = body.tags.split("#");
  const blog = new Blog({
    ...body,
    tags,
    date,
  });

  try {
    const savedBlog = await blog.save();
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
