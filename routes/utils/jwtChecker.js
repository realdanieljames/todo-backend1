var jwt = require("jsonwebtoken");

async function jwtChecker(req, res, next) {
  let jwtToken = req.headers.authorization.replace("Bearer ", "");

  try {
    jwt.verify(jwtToken, "hamsteroverlord007");

    next();
  } catch (err) {
    console.log(err);
    res.send("You have no permission to see this!");
  }
}

module.exports = jwtChecker;
