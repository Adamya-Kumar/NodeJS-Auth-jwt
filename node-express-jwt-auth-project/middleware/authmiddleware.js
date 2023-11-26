const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requiredAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "test1234", (err, decodejwt) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(decodejwt);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check for everyRoute..
function checkUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "test1234", async (err, decodejwt) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodejwt.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requiredAuth, checkUser };
