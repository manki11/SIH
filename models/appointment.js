var mongoose = require("mongoose")

var appointmentSchema = new mongoose.Schema({
    department: String,
    doctor: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Doctor"
        },
        doctorName: String
    },
    date: String,
    time: String,
    type: String,
    patient: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        userName: String
    },
    isCompleted: Boolean,
    nextAppointment: String,
    prescription: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Prescription"
        }
    }
});

module.exports = mongoose.model("Appointment",appointmentSchema);