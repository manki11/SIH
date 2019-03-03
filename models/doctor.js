var mongoose = require("mongoose")
passportLocalMongoose = require("passport-local-mongoose");

var doctorSchema = new mongoose.Schema({
    name: String,
    department: String,
    phoneNo: String,
    email: String,
    newQuestions: [{
        type: String
    }],
    oldQuestion:[{
        type: String
    }]
});

doctorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Doctor",doctorSchema);