var mongoose = require("mongoose")

var prescriptionSchema = new mongoose.Schema({
    medicine: String,
    dose: String,
    patient: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        userName: String
    },
    isDelivered: Boolean
});

module.exports = mongoose.model("Prescription",prescriptionSchema);