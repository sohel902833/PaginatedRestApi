const express = require("express");
const app = express();
const { users, posts } = require("./data");
const mongoose = require("mongoose");
const User = require("./usersSchema");
const e = require("express");
var cors = require('cors')

mongoose.connect("mongodb://localhost/pagination", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", async () => {
  if (User.countDocuments().exec() > 0) return;

  Promise.all([
    User.create({ name: "User 1",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero."}),
    User.create({ name: "User 2",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 3",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 4",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 5",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 6",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 7",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 8",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 9",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 10",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 11",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 12",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 13",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 14",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 15",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 16",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 17",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 18",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 19",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 20",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 21",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 22",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 23",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 24",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 25",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 26",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 27",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 28",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
    User.create({ name: "User 29",desc: "Et lorem dolores dolor lorem takimata no sadipscing eos, diam amet gubergren sadipscing tempor amet dolor amet clita, lorem vero." }),
  ])
    .then(() => console.log("User Created."))
    .catch((err) => {
      console.log(err);
    });
});

app.use(cors())
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
