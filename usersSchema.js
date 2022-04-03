const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Users", usersSchema);
module.exports = User;
