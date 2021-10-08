const express = require("express");
const app = express();
const { users, posts } = require("./data");
const mongoose = require("mongoose");
const User = require("./usersSchema");
const e = require("express");

mongoose.connect("mongodb://localhost/pagination", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", async () => {
  if (User.countDocuments().exec() > 0) return;

  Promise.all([
    User.create({ name: "User 1" }),
    User.create({ name: "User 2" }),
    User.create({ name: "User 3" }),
    User.create({ name: "User 4" }),
    User.create({ name: "User 5" }),
    User.create({ name: "User 6" }),
    User.create({ name: "User 7" }),
    User.create({ name: "User 8" }),
    User.create({ name: "User 9" }),
    User.create({ name: "User 10" }),
    User.create({ name: "User 11" }),
    User.create({ name: "User 12" }),
    User.create({ name: "User 13" }),
    User.create({ name: "User 14" }),
    User.create({ name: "User 15" }),
    User.create({ name: "User 16" }),
    User.create({ name: "User 17" }),
    User.create({ name: "User 18" }),
    User.create({ name: "User 19" }),
    User.create({ name: "User 20" }),
    User.create({ name: "User 21" }),
  ])
    .then(() => console.log("User Created."))
    .catch((err) => {
      console.log(err);
    });
});
//routes
app.get("/users", paginatedResults(User), (req, res, next) => {
  res.status(201).json(res.paginatedResults);
});
app.get("/posts", paginatedResults(posts), (req, res, next) => {
  res.status(201).json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};

    if (endIndex < (await model.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      result.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = result;
      next();
    } catch (err) {
      res.status(500).json({
        messae: e.message,
      });
    }
  };
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`listening on post ${PORT}`);
});
