"use strict";
var express = require("express"),
    Doctor = require("../models/doctor"),
    Appointment = require('../models/appointment'),
    Prescription= require('../models/prescription'),
    middleware = require("../middlewares");

var router = express.Router();

router.get("/home", function (req, res) {
    Doctor.findOne({}, function (err, doctor) {
        if (err) console.log(err);
        Appointment.find({}, function (err, allAppointments) {
            if (err) console.log(err);
            else {
                console.log(allAppointments);
                res.render("doctorHome", {appointment: allAppointments});
            }
        })
    })
});

router.get("/prescription", function (req, res) {
    res.render("prescription")
});

router.post("/prescription", function (req,res) {
    var medicine= req.body.medicine;
    var dose= req.body.dose;
    var instructions= req.body.instructions;
    var physical= req.body.physical;
    var provisional= req.body.provisional;
    var investigation= req.body.investigation;

    var prescription= {
        medicine: medicine,
        dose: dose,
        instructions: instructions,
        physical: physical,
        provisional: provisional,
        investigation: investigation
    };

    Prescription.create(prescription, function (err, pres) {
        if(err)console.log(err);
        else{
            res.render("/doctor/home")
        }
    })


})

router.get("/register", function (req, res) {
    res.render("registerDoctor");
});

router.post("/register", function (req, res) {
    var doctor = {
        name: req.body.name,
        department: req.body.department,
        email: req.body.username,
        phoneNo: req.body.phoneNo
    };

    Doctor.create(doctor, function (err, doctor) {
        if (err) {
            console.log(err);
            return res.render("registerDoctor");
        } else {
            console.log(doctor);
            res.send("doctorHome");
        }
    });
});

router.get("/login", function (req, res) {
    res.render("login_Doctor");
});

router.post("/login", function (req, res) {
    Doctor.find({username: req.body.username}, function (doctor) {
        res.redirect("/doctor/home")
    })
});

router.get("/appointment/:id",function (req, res) {
    var id= req.params.id;
    Appointment.findById(id,function (err, app) {
        if(err){
            console.log(err);
        }else{
            res.render("appointment_show",{app:app});
        }
    });
});

module.exports = router;