var mongoose = require("mongoose")

var vitalsSchema = new mongoose.Schema({
    height: String,
    weight: String,
    pulse: String,
    bp: String,
    patient:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});

module.exports = mongoose.model("Vitals",vitalsSchema);