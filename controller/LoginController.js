const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');
const bcrypt = require("bcrypt");

const authMiddleware = require("../middleware/middleware");

router.get("/Login", authMiddleware.GetLogin, (req, res) => {
    res.render("Login");
});

router.post("/SaveLogin", authMiddleware.GetLogin, async (req, res) => {
    const { username, password } = req.body;
    var existuser = false;

    User.findOne({ username: username }, async (methodError, user) => {
        if (!user) {
          await User.create(req.body);
          res.redirect("/");
        } else {
          console.log("exist");
          res.render("login", {
            error: "User already registered with the same User Name",
          });
        }
      });
})

router.post("/authenticateUser" , authMiddleware.GetLogin, async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.usertype;
          global.loggedIn = req.session.userId;
          global.userType = req.session.userType;
          res.redirect("/");
        } else {
          res.render("login", {
            error: "Wrong password",
          });
        }
      });
    } else {
      res.render("login", {
        error: "No User Found",
      });
    }
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;