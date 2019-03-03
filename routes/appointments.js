"use strict";
var express = require("express"),
    Appointment = require("../models/appointment"),
    User = require("../models/user"),
    Doctor= require("../models/doctor"),
    Vitals = require("../models/vitals"),
    middleware = require("../middlewares");
var router = express.Router();


router.get("/",middleware.isLoggedIn, function (req, res) {
    Appointment.find(function (err, allAppointments) {
        if(err){
            console.log(err);
        }else{
            console.log(allAppointments);
            
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
    
    console.log(patient);
    

    //
    Doctor.findOne({}, function (err, doctor) {

        var doc={
            id:doctor._id,
            doctorName: doctor.name
        }

        var newAppointment={
            department:department,
            date:date,
            time:time,
            patient:patient,
            doctor: doc,
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

        res.redirect("appointments/vitals");
    })
});

router.get("/vitals", middleware.isLoggedIn, function (req,res) {
    res.render("vitals")
});

router.post("/vitals", middleware.isLoggedIn, function (req,res) {
    User.findById(req.user.id, function (err, user) {
        if(err){
            req.flash("error","Something went wrong. Please try again later");
            console.log(err);
            res.redirect("/home");
        }else{
            Vitals.create({
                bp: req.body.bp,
                height: req.body.height,
                weight: req.body.weight,
                pulse: req.body.pulse,
                patient: user
            }, function (err, vital) {
                if(err){
                    console.log(err);
                }else{
                    vital.save();
                    user.vitals.push(vital);
                    user.save(function (err, user) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(vital);
                            res.redirect("/appointments/questions");
                        }
                    });
                }
            });
        }
    });
});

router.get("/new",middleware.isLoggedIn, function (req, res) {
    res.render("appointment_new");
});

router.get("/questions", middleware.isLoggedIn, function (req,res) {
    res.render("questions", {drName:"Dr Mankirat"})
});


module.exports= router;
