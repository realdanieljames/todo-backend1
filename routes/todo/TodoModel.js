var mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
