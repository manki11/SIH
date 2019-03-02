var express = require("express"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    mongoose= require("mongoose");

var indexRoutes= require("./routes/index");

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

app.use(indexRoutes);

app.listen(9000,function(){
    console.log("Authentication demo started");
});
