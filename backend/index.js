const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { PORT, MONGODB_URI } = process.env;

const app = express();

const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const blogRouter = require("./controllers/blogs");
const imageRouter = require("./controllers/images");

console.log("connecting to", MONGODB_URI);
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then((res) => console.log("connected to mongodb"))
  .catch((error) => console.log(error.message));

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

app.get("/", async (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/images", imageRouter);

app.listen(PORT, () => console.log("server running on port", PORT));
