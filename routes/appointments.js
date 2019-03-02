"use strict";
var express = require("express"),
    Appointment = require("../models/appointment"),
    middleware = require("../middlewares");
var router = express.Router();


router.get("/",middleware.isLoggedIn, function (req, res) {
    Appointment.find(function (err, allAppointments) {
        if(err){
            console.log(err);
        }else{
            res.render("appointment", {appointment: allAppointments});
        }
    });

});

router.post("/", middleware.isLoggedIn, function (req, res) {
    var department= req.body.department;
    var drName= req.body.drName;
    var date= req.body.date;
    var time= req.body.time;
    var type= req.body.patient;

    var patient={
        id:req.user._id,
        username:req.user.username
    };

    var newAppointment={
        department:department,
        date:date,
        time:time,
        patient:patient,
        type: type,
        isCompleted: false
    };

    console.log(newAppointment);


    Appointment.create(newAppointment, function (err, appointment) {
        if (err) {
            console.log(err);
        } else {
            console.log("Appointment Created");
        }
    });

    res.redirect("appointments/questions");
});

router.get("/new",middleware.isLoggedIn, function (req, res) {
    res.render("appointment_new");
});

router.get("/questions", middleware.isLoggedIn, function (req,res) {
    res.render("questions", {drName:"Dr Rajeev"})
});


module.exports= router;
