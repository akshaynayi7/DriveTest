const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  fname: String,
  lname: String,
  age: Number,
  license_no: String,
  birthdate: String,
  usertype: String,
  appointmentId: String,
  car_details:{
    make: String,
    model: String,
    year: Number,
    plat_no: String
  }
});

UserSchema.pre("save", function (next) {
  const user = this;

  if(user.license_no == null || user.license_no == "" || user.license_no == undefined){
    bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash;
      next();
    });
  }
  if(user.license_no != null){
    bcrypt.hash(user.license_no, 10, (error, hash) => {
      user.license_no = hash;
      next();
    });
  }
  

  
});

module.exports = mongoose.model("User", UserSchema);
