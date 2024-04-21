//package
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require("express-session");
mongoose.set('strictQuery', true);
//schema
const User = require('./model/UserModel');

//path
const app = express();

//midleware
app.use(bodyParser.urlencoded({
    extended: true
}));

//db connect 
mongoose.connect('mongodb+srv://axaynayi7:axaynayi7@fullstack2023.hpmgemz.mongodb.net/assignment2?retryWrites=true&w=majority', { useNewUrlParser: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

//static file
app.use(express.static('public'));

//template engine
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000; // port number

//middleware
const authMiddleware = require("./middleware/middleware");
app.use(
  expressSession({
    secret: "session are best",
    resave: false,
    saveUninitialized: true
  })
);

//control the navigation links
global.loggedIn = null;
global.userType = null;

app.use("*", (req, res, next) => {
  global.loggedIn = req.session.userId;
  global.userType = req.session.userType;
  next();
});

//Controller 
const DashboardController = require('./controller/DashboardController');
const GController = require('./controller/GController');
const G2Controller = require('./controller/G2Controller');
const LoginController = require('./controller/LoginController');
const AppointmentController = require('./controller/AppointmentController');

app.use('/', DashboardController);
app.use('/', GController);
app.use('/', G2Controller);
app.use('/', LoginController);
app.use('/', AppointmentController);

//server
app.listen(3000, () => {
    console.log("App running on port: "+ port);
})