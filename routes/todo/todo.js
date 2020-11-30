var express = require("express");
var router = express.Router();
var jwtChecker = require("../utils/jwtChecker");
var {
  createTodo,
  getAllUserTodos,
  deleteTodo,
  updateTodo,
} = require("./todoController");

/* GET home page. */
router.get("/get-user-all-todos", jwtChecker, getAllUserTodos);

//router.get("/get-user-all-todos/:id", getAllUserTodos);

router.post("/create-todo", jwtChecker, createTodo);

// router.delete("/delete-todo/:userID/:todoID", deleteTodo);

router.delete("/delete-todo", jwtChecker, deleteTodo);

router.put("/update-todo", jwtChecker, updateTodo);

module.exports = router;
