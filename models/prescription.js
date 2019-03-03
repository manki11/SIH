var mongoose = require("mongoose")

var prescriptionSchema = new mongoose.Schema({
    medicine: String,
    dose: String,
    instruction: String,
    physical: String,
    provisional: String,
    investigation:String,
});

module.exports = mongoose.model("Prescription",prescriptionSchema);