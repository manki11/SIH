"use strict";
var express= require("express"),
    Doctor= require("../models/doctor"),
    Appointment= require('../models/appointment'),
    middleware= require("../middlewares");

var router= express.Router();

router.get("/login",function(req,res){
    res.render("login");
});

router.get("/home",function(req,res){
    Doctor.findOne({}, function (err, doctor) {
        if(err) console.log(err);
        Appointment.find({}, function (err, allAppointments) {
            if(err) console.log(err);
            console.log(allAppointments);
            
            res.render("doctorHome", {appointment:allAppointments});
        })
    })
});

router.get("/register",function(req,res){
    res.render("registerDoctor");
});

router.post("/register",function(req,res){
    var doctor={
        name:req.body.name,
        department:req.body.department,
        email:req.body.username,
        phoneNo:req.body.phoneNo
    };

    Doctor.create(doctor, function(err,doctor){
        if(err){
            console.log(err);
            return res.render("registerDoctor");
        }else{
            console.log(doctor);
            res.send("doctorHome");
        }
    });
});

router.get("/login", function(req,res){
    res.render("loginDoctor");
});

router.post("/login",function(req,res){
    Doctor.find({username: req.body.username}, function (doctor) {
        res.render("doctorHome")
    })
});

module.exports= router;