const express = require('express');
const router = express.Router();
const User = require('../model/UserModel');
const Appointment = require('../model/appointment');
const authMiddleware = require("../middleware/middleware");

// router.get("/G2", authMiddleware.checkLogin, (req, res) => {
//   res.render('G2');
// })

router.get("/G2", authMiddleware.checkLogin, async (req, res) => {
    const userDetail = await User.findById(loggedIn);
    if (userDetail && userDetail.licenceNo != "undefine") {
      const timeSlot = await Appointment.findById(userDetail.appointmentId);
      res.render("g2", { userDetail: userDetail, timeSlot: timeSlot });
    } else {
      res.render("g2", { userDetail: new User() });
    }
  });

router.post("/getG2data", authMiddleware.checkLogin, async(req, res) => {
    const user = await User.findById(loggedIn);
    if (userDetail && userDetail.licenceNo != "undefine") {
        res.render("g2", { userDetail: userDetail });
      } else {
        res.render("g2", { userDetail: new userDetails() });
      }
});

router.get("/G2/:licenceNo" , async (req, res) => {
  const userDetail = await userDetail.find({
    licenceNo: req.params.licenceNo,
  });
  res.render("g2", {
    userDetail,
  });
});

router.post("/g2test/post", async (req, res) => {
  await User.findOneAndUpdate(
    { _id: loggedIn },
    {
      ...req.body,
      appointmentId: req.body.timeSlot,
      car_details: {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        plat_no : req.body.plat_no,
      },
    }
  );
  await Appointment.findByIdAndUpdate(
    { _id: req.body.timeSlot },
    {
      isTimeSlotAvailable: false,
    }
  );
  res.redirect("/");
});

router.get("/GetAvailSlotsForBook", async (req, res) => {
  const data = await Appointment.find({
    date: req.query.dateSlot,
    isTimeSlotAvailable: true,
  });
  res.end(JSON.stringify(data, null, 3));
});

module.exports = router;