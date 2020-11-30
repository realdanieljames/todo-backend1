var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{ type: mongoose.Schema.ObjectId, ref: "Todo" }],
});

module.exports = mongoose.model("User", UserSchema);
