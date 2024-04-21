const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');

router.get("/", (req, res) => {
    res.render("dashboard");
});

module.exports = router;  