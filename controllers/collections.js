const collectionRouter = require("express").Router();
const Collection = require("../models/collection");

const { userExtractor } = require("../utils/middlewares");

collectionRouter.post("/", userExtractor, async (req, res, next) => {
  const { body } = req;
  console.log(body, req.body);
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
    user: user.id,
  });

  try {
    let savedCollection = await collection.save();
    user.collections = user.collections.concat(savedCollection);
    await user.save();

    res.send(savedCollection).status(200);
  } catch (error) {
    next(error);
  }
});

collectionRouter.get("/", async (req, res, next) => {
  console.log("in get collection router");
  try {
    const allCollections = await Collection.find().populate("user", {
      username: 1,
      profession: 1,
      number: 1,
      collections: 1,
    });

    res.send(allCollections);
  } catch (error) {
    next(error);
  }
});

collectionRouter.get("/:id", async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id).populate(
      "donors",
      {
        username: 1,
        profession: 1,
        email: 1,
      },
      "user",
      {
        username: 1,
        profession: 1,
        number: 1,
        collections: 1,
      }
    );
    res.send(collectionRefactoring(collection));
  } catch (error) {
    next(error);
  }
});

collectionRouter.put("/", userExtractor, async (req, res, next) => {
  let { body } = req;
  const { id } = body;
  const user = req.user;

  console.log(id);

  if (!body.title || !body.tags || !body.description || !body.country)
    return res.status(402).send({
      error: "some inputs are missing! please fill in all the inputs",
    });

  body = { ...body, tags: body.tags.split("#") };

  // console.log("incomming blog:", body);
  try {
    const collection = await Collection.findById(id);
    const newCollection = {
      ...collection.doc,
      title: body.title,
      tags: body.tags,
      description: body.description,
      country: body.country,
    };
    console.log(newCollection, collection);

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      newCollection,
      {
        new: true,
      }
    );
    console.log("updatedCollection:", updatedCollection);
    res.send(updatedCollection);

    // res.status(404).end();
  } catch (error) {
    next(error);
  }
});

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
