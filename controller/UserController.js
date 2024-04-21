const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');

router.post("/", (req, res) =>{
    res.render('dashboard');
})

router.post("/g2test/post", async (req, res) => {
    let make = req.body.make;
    let model = req.body.model;
    let year = req.body.year;
    let plat_no = req.body.plat_no;
    await User.create({
        ...req.body,
        car_details:{
            make : make,
            model : model,
            year : year,
            plat_no : plat_no
        }
    });
    res.redirect('/');
})

router.post("/g2test/getdata", async (req, res) => {
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

router.post("/g2testupdate/post", async (req, res) => {
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