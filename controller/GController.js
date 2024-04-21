const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');
const authMiddleware = require("../middleware/middleware");

router.get("/G", authMiddleware.checkLogin, async (req, res) => {
    const user = await User.findById(loggedIn);
    if (user) {
        res.render("g", { user: user });
    } else {
        res.render("g", {
        error: "No User Found",
        });
    }
});

router.post("/g2test/getdata", authMiddleware.checkLogin, async (req, res) => {
    const license = req.body.license;
    const user = await User.find({license_no : license});
    if(user.length > 0){
        res.render("G", {
            user
        })
    }
    else{
        res.render("G", {
            error : "No user found!"
        })
    }
    
})

router.post("/g2testupdate/post", authMiddleware.checkLogin, async (req, res) => {
    await User.findOneAndUpdate(
        {license: (req.body.license_no).toString()},
        {
            car_details : { 
                make : req.body.make,
                model : req.body.model,
                year : req.body.year,
                plat_no : req.body.plat_no
        }
        }
    );
    res.render("G");
})

module.exports = router;