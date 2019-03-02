"use strict";
var express= require("express"),
    passport= require("passport"),
    User= require("../models/user"),
    middleware= require("../middlewares");

var router= express.Router();

router.get("/",function(req,res){
    res.render("login");
});

router.get("/home",middleware.isLoggedIn,function(req,res){
    res.render("index");
});

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    User.register(new User({username : req.body.username}),req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/home");
        });
    });
});

router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login"
}),function(req,res){

});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

module.exports= router;
