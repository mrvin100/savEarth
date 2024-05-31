const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    default: "Unknown",
  },
  date: String,
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  country: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Collection", schema);
