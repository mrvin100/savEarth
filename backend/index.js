const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { PORT, MONGODB_URI } = process.env;
const {
  errorHandler,
  unknownEndpoint,
  logger,
  tokenExtractor,
} = require("./utils/middlewares");

const app = express();

const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const blogRouter = require("./controllers/blogs");
const collectionRouter = require("./controllers/collections");

console.log("connecting to", MONGODB_URI);
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then((res) => console.log("connected to mongodb"))
  .catch((error) => console.log(error.message));

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use("/images", express.static("images"));
app.use(logger);

app.get("/", async (req, res) => {
  res.send("<h1>hello world</h1>");
});
app.use(tokenExtractor);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/collections", collectionRouter);

app.use(unknownEndpoint);
app.use(errorHandler);
const port = PORT || 3000;

app.listen(port, () => console.log("server running on port", port));
