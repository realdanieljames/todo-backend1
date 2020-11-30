var mongoose = require("mongoose");

var Todo = require("./TodoModel");
var User = require("../users/User");
const TodoModel = require("./TodoModel");

module.exports = {
  createTodo: async (req, res) => {
    try {
      let newTodo = new Todo({ todo: req.body.todo });

      let savedTodo = await newTodo.save();

      //var id = mongoose.Types.ObjectId("5fb58812a0d1cd6774b77c1c");
      let foundUser = await User.findById(req.body._id);

      foundUser.todos.push(savedTodo);

      await foundUser.save();

      res.json(savedTodo);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  getAllUserTodos: async (req, res) => {
    //console.log(req.query);
    //console.log(req.params);
    try {
      let allUserTodos = await User.findById(req.query.userID)
        .populate("todos", "todo")
        .select("-password -__v");

      // let allUserTodos = await User.findById(req.params.id)
      //   .populate("todos", "todo")
      //   .select("-password -__v");

      res.json(allUserTodos);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  // deleteTodo: async (req, res) => {
  //   let userID = req.params.userID;
  //   let todoID = req.params.todoID;
  //   try {
  //     let foundUser = await User.findById(userID);

  //     let foundUserArray = foundUser.todos;

  //     let filteredTodoArray = foundUserArray.filter((id) => {
  //       if (id.toString() !== todoID) {
  //         return id;
  //       }
  //     });

  //     foundUser.todos = filteredTodoArray;

  //     await foundUser.save();

  //     await TodoModel.findByIdAndDelete(todoID);

  //     res.send(todoID);
  //   } catch (e) {
  //     res.status(500).json({ message: e.message });
  //   }
  // },
  deleteTodo: async (req, res) => {
    let userID = req.body.userID;
    let todoID = req.body.todoID;

    try {
      let foundUser = await User.findById(userID);

      let foundUserArray = foundUser.todos;

      let filteredTodoArray = foundUserArray.filter((id) => {
        if (id.toString() !== todoID) {
          return id;
        }
      });

      foundUser.todos = filteredTodoArray;

      await foundUser.save();

      await TodoModel.findByIdAndDelete(todoID);

      res.send(todoID);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  updateTodo: async (req, res) => {
    try {
      let updatedTodo = await TodoModel.findByIdAndUpdate(
        req.body.todoID,
        { todo: req.body.newTodoValue },
        { new: true }
      );

      res.send(updatedTodo);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
};
