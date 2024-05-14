const imageRouter = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

imageRouter.post("/", upload.single("file"), async (req, res) => {
  console.log(req.file);
  res.send("uploadsuccessfull");
});

module.exports = imageRouter;
