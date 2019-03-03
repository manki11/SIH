var express = require("express"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    bodyParser = require('body-parser'),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    mongoose= require("mongoose");

var indexRoutes= require("./routes/index"),
    appointmentRoutes= require('./routes/appointments'),
    doctorRoutes= require('./routes/doctors')

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize()); 
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(__dirname+"/public"));



app.use(indexRoutes);
app.use("/appointments",appointmentRoutes);
app.use("/doctor",doctorRoutes);


app.listen(9000,function(){
    console.log("Authentication demo started");
});
