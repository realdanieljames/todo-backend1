var express = require("express");
var router = express.Router();
var { createUser, signIn } = require("./userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", createUser);

router.post("/sign-in", signIn);

module.exports = router;
