const collectionRouter = require("express").Router();
const Collection = require("../models/collection");

const multer = require("multer");
const { userExtractor } = require("../utils/middlewares");

const { PORT, HOST } = process.env;

function collectionRefactoring(savedCollection) {
  const link = savedCollection.src.split(" ").join("%20");
  const key = "user" in savedCollection ? "user" : "donors";
  const value = key === "user" ? savedCollection.user : savedCollection.donors;

  return {
    id: savedCollection.id,
    title: savedCollection.title,
    date: savedCollection.date,
    description: savedCollection.description,
    tags: savedCollection.tags,
    country: savedCollection.country,
    src: `${HOST}${PORT}/${link}`,
    [key]: value,
  };
}

const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "./images/collections");
  },
  filename: (req, file, fn) => {
    fn(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, fn) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    fn(null, true);
  } else {
    fn((error) => (req.imgError = error), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

collectionRouter.post(
  "/",
  userExtractor,
  upload.single("CollectionFile"),
  async (req, res, next) => {
    if (!req.file || req.imgError)
      return res.status(400).send({
        error:
          "invalid file extension (jpeg and png atleast 5MB) or image not found: " +
          req.imgError,
      });
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
    // console.log(body);
    if (!body.description || !body.title || !body.tags || !body.country)
      return res
        .status(400)
        .send({ error: "an input missing! please fill all inputs" });

    let date = new Date();

    date = `${
      days[date.getUTCDay()]
    }, ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;

    const tags = body.tags.split("#");

    const collection = new Collection({
      ...body,
      tags,
      date,
      src: req.file.path,
      user: user.id,
    });

    try {
      let savedCollection = await collection.save();
      user.collections = user.collections.concat(savedCollection);
      await user.save();

      res.send(collectionRefactoring(savedCollection)).status(200);
    } catch (error) {
      next(error);
    }
  }
);

collectionRouter.get("/", async (req, res, next) => {
  console.log("in get collection router");
  try {
    const allCollections = await Collection.find().populate("user", {
      userName: 1,
      profession: 1,
      number: 1,
      collections: 1,
      country: 1,
    });

    const refactoredCollections = allCollections.map((c) =>
      collectionRefactoring(c)
    );

    res.send(refactoredCollections);
  } catch (error) {
    next(error);
  }
});

collectionRouter.get("/:id", async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id).populate(
      "donors",
      {
        userName: 1,
        profession: 1,
        country: 1,
      }
    );
    res.send(collectionRefactoring(collection));
  } catch (error) {
    next(error);
  }
});

collectionRouter.put(
  "/",
  userExtractor,
  upload.single("collectionFile"),
  async (req, res, next) => {
    if (!req.file)
      return res
        .status(400)
        .send({ error: "invalid file extension: " + req.imgError });

    let { body } = req;

    if (!body.title || !body.tags || !body.description || !body.country)
      return res.status(402).send({
        error: "some inputs are missing! please fill in all the inputs",
      });

    body = { ...body, tags: body.tags.split("#") };
    const id = body.id;
    console.log("incomming blog:", body);
    try {
      const collection = await Collection.findById(id);
      const newCollection = {
        ...collection.doc,
        title: body.title,
        tags: body.tags,
        src: req.file.path,
        description: body.description,
        country: body.country,
      };
      console.log("newcollection:", newCollection);
      if (req.user.id.toString() === collection.user.toString()) {
        const updatedCollection = await Blog.findByIdAndUpdate(
          id,
          newCollection,
          {
            new: true,
          }
        );
        console.log("updatedCollection:", updatedCollection);
        res.send(collectionRefactoring(updatedCollection));
      }
      res.status(404).end();
    } catch (error) {
      next(error);
    }
  }
);

collectionRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const collection = await Collection.findById(id);

    user.id.toString() === collection.user.toString() &&
      (await Collection.findByIdAndDelete(id));

    user.collections = user.collections.filter((b) => b !== id);
    await user.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = collectionRouter;
