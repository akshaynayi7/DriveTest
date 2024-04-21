const User = require("../model/UserModel");

//This method will check all routes
const checkLogin = (req, res, next) => {
  if (!loggedIn) {
    return res.redirect("/login");
  } else if ((req.path == "/G2" || req.path == "/G") && userType != "Driver") {
    return res.redirect("/Dashboard");
  }
  next();
};

const GetLogin = (req, res, next) => {
  if (loggedIn) {
    return res.redirect("/");
  }
  next();
};

module.exports = { checkLogin, GetLogin };
